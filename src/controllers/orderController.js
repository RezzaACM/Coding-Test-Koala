import { transaction } from "objection";
import { generateOrderNumber, generateUuid } from "../helpers/helper";
import Order from "../models/order"
import OrderDetails from "../models/orderDetail";
import { CustomersController } from "./customerController";

export class OrderController {


    async index(req, res) {
        const list = await Order.query();

        res.status(200).json({
            status: true,
            data: list
        })
    }


    async detail(req, res) {
        const list = await OrderDetails.query()
            .select('*',)
            .join('orders as b', 'order_details.order_id', '=', 'b.order_id')
            .where('order_details.order_id', '=', req.params.id)

        const data = [];
        const details = [];
        list.forEach(res => {
            details.push({
                order_detail_id: res.order_detail_id,
                product_id: res.product_id,
                qty: res.qty
            })
        });
        data.push({
            order_id: list[0].order_id,
            customer_id: list[0].customer_id,
            order_number: list[0].order_number,
            payment_method_id: list[0].payment_method_id,
            created_date: list[0].created_date,
            details: details
        })

        res.status(200).json({
            status: true,
            data: data
        })
    }


    /**
     * POST /order
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res) {
        // console.log(req.body);
        try {
            let order_number = "";
            const orderId = generateUuid();
            await generateOrderNumber()
                .then(res => {
                    order_number = res;
                })

            const details = req.body.details
            const data = []
            details.forEach(element => {
                data.push({
                    order_detail_id: generateUuid(),
                    order_id: orderId,
                    product_id: element.product_id,
                    qty: element.qty,
                    created_date: 'now()'
                })
            });

            await transaction(Order, OrderDetails, async (Order, OrderDetails) => {
                await Order.query().insert({
                    order_id: orderId,
                    customer_id: req.body.customer_id,
                    order_number: order_number,
                    order_date: 'now()',
                    payment_method_id: req.body.payment_method_id
                })

                await OrderDetails.query().insert(data)

                new CustomersController().refreshToken(req, res, "Create Order Success")
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.toString()
            })
        }
    }

}