import Products from "../models/products"

export class ProductsController {
    async index(req, res) {
        const list = await Products.query()
            .select('*')

        console.log(parseInt(list[0].basic_price));

        res.status(200).json({
            status: true,
            data: list
        })
    }
}