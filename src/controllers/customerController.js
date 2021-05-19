import { generateOrderNumber, generatePassword, generateSalt, generateUuid, validationPass } from '../helpers/helper'
import { loginValidation, registerValidation } from '../helpers/validation'
import Customers from '../models/customers'
import jwt from 'jsonwebtoken';
import { transaction } from 'objection';
import AccessToken from '../models/accessToken';
import RefreshToken from '../models/refreshToken';
import moment from 'moment';

export class CustomersController {
    /**
     * GET /members
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const list = await Customers.query()
            .select('customer_id', 'customer_name', 'email', 'phone_number', 'created_date')

        res.status(200).json({
            status: true,
            data: list
        })
    }

    /**
     * POST /auth/register
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res) {
        try {

            const { error } = registerValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const hashingPassword = generatePassword(req.body.password, 16)
            await Customers.query().insert({
                customer_id: generateUuid(),
                customer_name: req.body.customer_name,
                email: req.body.email.toLowerCase(),
                phone_number: req.body.phone_number,
                dob: 'now()',
                sex: req.body.sex,
                salt: hashingPassword.salt,
                password: hashingPassword.hash,
                created_date: 'now()'
            })
            res.status(201).json({
                status: true,
                message: 'Register succesfull!'
            })
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.nativeError.detail
            })
        }
    }


    /**
     * POST /auth/login
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async login(req, res) {
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const customer = await Customers.query()
            .where('email', '=', req.body.phone_or_email.toLowerCase())
            .orWhere('phone_number', '=', req.body.phone_or_email.toLowerCase())

        if (customer.length <= 0) {
            res.status(401).json({
                status: false,
                message: "Username or password incorrect!"
            })
        } else {
            const check = validationPass(req.body.password, customer[0].salt, customer[0].password)
            if (!check) {
                res.status(401).json({
                    status: false,
                    message: "Username or password incorrect!"
                })
            } else {
                this.generateToken(res, customer, "Login Success")
                    .then(result => {
                        res.status(200).json({
                            ...result
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            ...err
                        })
                    })
            }
        }
    }

    /**
     * post /auth/refresh-token
     * @param {*} req 
     * @param {*} res 
     * @param {*} message 
     */
    async refreshToken(req, res, message = "") {
        const refreshToken = req.headers['refresh-token'];
        if (refreshToken) {
            try {
                const token = await RefreshToken.query().findOne({ token: refreshToken });
                if (!token) res.status(401).json({ status: false, message: 'Token not found!' })
                if (new Date(token.expired_at).getTime() < new Date().getTime() || token.revoke === true) {
                    res.status(405).json({
                        status: false,
                        message: "Token was invalid!"
                    })
                } else {
                    try {
                        await transaction(AccessToken, RefreshToken, async (AccessToken, RefreshToken) => {

                            // revoke refresh token
                            await RefreshToken.query()
                                .patch({ revoke: 1 })
                                .where('id', '=', token.id)

                            // // revoke access token
                            await AccessToken.query()
                                .patch({ revoke: 1 })
                                .where('id', '=', token.access_token_id)

                            const userOnAccessToken = await AccessToken.query().findOne({ id: token.access_token_id })
                            const customer = await Customers.query()
                                .select('customer_id', 'customer_name', 'email', 'phone_number', 'created_date')
                                .where('customer_id', '=', userOnAccessToken.customer_id)

                            this.generateToken(res, customer, message)
                                .then(result => {
                                    res.status(200).json({
                                        ...result
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        ...err
                                    })
                                })

                        })
                    } catch (err) {
                        res.send(err)
                    }
                }
            } catch (err) {
                res.status(403).json({
                    status: false,
                })
            }
        } else {
            res.status(401).json({
                status: false,
                message: 'Token not found!'
            })
        }
    }


    /**
     * Generate jwt and refresh token
     * @param {*} res 
     * @param {*} user 
     * @returns 
     */
    async generateToken(res, user, message = "") {
        const secretToken = 'D16QCAZ7KN92YW0RJW3VU9DGMVYUMVZMTCM89JP5';
        const randomString = generateSalt(50)
        const accessId = generateUuid()

        const token = jwt.sign({
            id: accessId,
            customer_id: user[0].customer_id,
            customer_name: user[0].customer_name,
            email: user[0].email,
            phone_number: user[0].phone_number
        }, secretToken, {
            expiresIn: '1h',
            // algorithm:'RS256'
        })


        try {
            await transaction(AccessToken, RefreshToken, async (AccessToken, RefreshToken) => {
                const nextHour = moment().add(1, 'hours').toISOString();
                const sevenDays = moment().add(7, 'days').toISOString();
                await AccessToken.query()
                    .insert({
                        id: accessId,
                        customer_id: user[0].customer_id,
                        expired_at: nextHour
                    })

                await RefreshToken.query()
                    .insert({
                        access_token_id: accessId,
                        token: randomString,
                        expired_at: sevenDays
                    })
            })

            return {
                status: true,
                message: message,
                data: {
                    token: token,
                    expiresIn: 3600,
                    refreshToken: randomString,
                    expiredRefreshToken: 604800
                }
            }

        } catch (error) {
            return error
        }
    }


}
