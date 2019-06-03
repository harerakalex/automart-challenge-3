import express from 'express';
import Car from '../../controllers/car';
import multipart from 'connect-multiparty';
const multipartMiddleware = multipart();



const router = express.Router();

// create car instance
const car = new Car();

// creating a product car
router.post('/', multipartMiddleware, car.create);

// update the price of posted car
router.patch('/:id/price', car.updatePrice);

// update the status of posted car
router.patch('/:id/status', car.updateStatus);

// view a specific car
router.get('/:id', car.fetchId);

// view a specific car
router.get('/', car.fetch);

export default router;
