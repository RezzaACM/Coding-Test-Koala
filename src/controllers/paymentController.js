import { generateUuid } from "../helpers/helper";
import Payment from "../models/payment";

export class PaymentController {
    async index(req, res) {
        const list = await Payment.query()
            .select('*')

        // console.log(parseInt(list[0].basic_price));

        res.status(200).json({
            status: true,
            data: list
        })
    }


    async create(req, res) {
        try {
            await Payment.query().insert({
                payment_method_id: generateUuid(),
                method_name: req.body.name,
                code: req.body.code,
                created_date: 'now()'
            })

            res.json({
                status:true,
                message:'Success'
            },200)
        } catch (error) {
            res.json({
                status: false,
                message: "Success create payment method"
            }, 402)
        }
    }
}