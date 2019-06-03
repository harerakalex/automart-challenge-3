import express from 'express';
import Car from '../../controllers/car';
import multipart from 'connect-multiparty';
const multipartMiddleware = multipart();



const router = express.Router();

// create car instance
const car = new Car();

// creating a product car
router.post('/', multipartMiddleware, car.create);

router.get('/:car-id/status', car.fetch);

export default router;
