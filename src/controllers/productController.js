import { generateUuid } from "../helpers/helper";
import Products from "../models/products"

export class ProductsController {
    async index(req, res) {
        const list = await Products.query()
            .select('*')

        // console.log(parseInt(list[0].basic_price));

        res.status(200).json({
            status: true,
            data: list
        })
    }

    async create(req, res) {
        try {
            await Products.query().insert({
                product_id: generateUuid(),
                product_name: req.body.name,
                basic_price: req.body.price,
                created_date: 'now()'
            })

            res.json({
                status:true,
                message: 'Success create product'
            },201)
        } catch (error) {
            res.json({
                status: false,
                message: error.toString()
            }, 402)
        }
    }
}