import Payment from "../models/payment";

export class PaymentController {
    async index(req, res) {
        const list = await Payment.query()
            .select('*')

        console.log(parseInt(list[0].basic_price));

        res.status(200).json({
            status: true,
            data: list
        })
    }
}