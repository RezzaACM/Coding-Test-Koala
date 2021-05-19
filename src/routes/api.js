import router from 'express'
import { CustomersController } from '../controllers/customerController';
import { OrderController } from '../controllers/orderController';
import { PaymentController } from '../controllers/paymentController';
import { ProductsController } from '../controllers/productController';
import { verifyToken } from '../middleware/verify';


const route = router.Router();

// Members Routing
route.get('/members', verifyToken, (req, res) => {
    new CustomersController().index(req, res)
})
route.post('/auth/register', (req, res) => {
    new CustomersController().create(req, res)
})

route.post('/auth/login', (req, res) => {
    new CustomersController().login(req, res)
})

route.post('/auth/refresh-token', (req, res) => {
    new CustomersController().refreshToken(req, res)
})

route.get('/products', (req, res) => {
    new ProductsController().index(req, res)
})


route.get('/payments', (req, res) => {
    new PaymentController().index(req, res)
})


route.post('/order', verifyToken, (req, res) => {
    new OrderController().create(req, res)
})

export default route