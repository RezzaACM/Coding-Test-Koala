import jwt from 'jsonwebtoken';
import AccessToken from '../models/accessToken';

export const verifyToken = async (req, res, next) => {
    const token = req.header('authorization');
    const value = token?.split(' ');
    if (!token || value[0] !== 'Bearer') {
        res.json({
            status:false,
            message: 'Unauthorize!'
        })
        return;
    }

    try {
        const tokenSecret = 'D16QCAZ7KN92YW0RJW3VU9DGMVYUMVZMTCM89JP5';
        const verified = jwt.verify(value[1], tokenSecret);

        const checkTokenRevoke = await AccessToken.query()
            .select("revoke")
            .where("id", '=', verified.id);
        if (checkTokenRevoke[0].revoke === false) {
            next();
        } else {
            res.status(401).json({
                status: false,
                message: 'Token has been revoke'
            })
        }
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'Unauthorize!'
        })
    }
}