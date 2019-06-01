import express from 'express';
import Car from '../../controllers/car';

const router = express.Router();

// create car instance
const car = new Car();

// creating a product car
router.post('/', car.create);

router.get('/:car-id/status', car.fetch);

export default router;
