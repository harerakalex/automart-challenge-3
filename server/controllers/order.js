import Joi from 'joi';
import { orderValidation } from '../helper/validation';
import timeStamp from '../helper/timestamp';
import cars from '../models/cars';
import orders from '../models/orders';

const DateTime = timeStamp();


class Order {
 


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async create(req, res) {
	const { error } = Joi.validate(req.body, orderValidation);
	if (error) {
		const errorMessage = error.details[0].message;
		return res.status(400).json({
        status: 400,
        error: errorMessage
      });
	}else{
		// getting the price of specified car_id
	    const carId = req.body.car_id;
	    const foundCar = cars.find(c => c.id == carId);
	    if (!foundCar) 
	    	return res.status(404).json({ status: 404, error: 'Could not find Car with a given ID' });

	    const actualPrice = foundCar.price;
	    const newOrder = {
	      id: orders.length + 1,
	      buyer: parseInt(req.body.buyer_id, 10),
	      car_id: parseInt(req.body.car_id, 10),
	      created_on: DateTime,
	      price: actualPrice,
	      price_offered: parseFloat(req.body.amount),
	      status: 'pending',
	    };

	    orders.push(newOrder);
	    res.status(201).json({
	    	status: 201,
	    	data: newOrder,
	    });
	} 
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async update(req, res) {
  
}

}

export default Order;

