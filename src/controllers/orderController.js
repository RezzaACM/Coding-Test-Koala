import { transaction } from "objection";
import { generateOrderNumber, generateUuid } from "../helpers/helper";
import Order from "../models/order"
import OrderDetails from "../models/orderDetail";
import { CustomersController } from "./customerController";

export class OrderController {


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