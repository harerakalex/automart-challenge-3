import express from 'express';
import Car from '../../controllers/car';
import auth from '../../middlewares/checkAuth';
import admin from '../../middlewares/admin';
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

// view a car with option like status or price range
router.get('/', car.fetch);

// admin view all cars

// router.get('/all', car.fetchAll) 

// Delete a specific car
router.delete('/:id', [auth, admin], car.delete);

// reporting a car
router.post('/flag', auth, car.report);

export default router;
