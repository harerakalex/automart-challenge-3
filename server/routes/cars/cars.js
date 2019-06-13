import express from 'express';
import Car from '../../controllers/car';
import auth from '../../middlewares/checkAuth';
import multipart from 'connect-multiparty';
const multipartMiddleware = multipart();



const router = express.Router();

// create car instance
const car = new Car();

// creating a product car
router.post('/', auth,multipartMiddleware, car.create);

// update the price of posted car
router.patch('/:id/price', auth, car.updatePrice);

// update the status of posted car
router.patch('/:id/status', auth, car.updateStatus);

// view a specific car
router.get('/:id', car.fetchId);

// view a specific car
router.get('/', car.fetch);

// Delete a specific car
router.delete('/:id', auth, car.delete);

// reporting a car
router.post('/flag', auth, car.report);

export default router;
