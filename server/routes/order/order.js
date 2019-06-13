import express from 'express';
import Order from '../../controllers/order';
import auth from '../../middlewares/checkAuth';

const router = express.Router();

// create instance for the order class 
const order = new Order();

// route for creating order
router.post('/', auth, order.create);

// update the price
router.patch('/:id/price', auth, order.update);


export default router;