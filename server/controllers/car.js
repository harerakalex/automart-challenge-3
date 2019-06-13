import Joi from 'joi';
import { validateCar, updateCarPrice, updateCarStatus, queryValidation, fraudValidation } from '../helper/validation';
import timeStamp from '../helper/timestamp';
import cars from '../models/cars';
import frauds from '../models/frauds';
import cloudinary from 'cloudinary';
import cloudinaryConfig from '../helper/cloudinaryConfig';

const DateTime = timeStamp();

class Car {
 

 
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async fetch(req, res) {
	const { error } = Joi.validate(req.query, queryValidation);
	if (error) {
		const errorMessage = error.details[0].message;
		return res.status(400).json({
        status: 400,
        error: errorMessage
      });
	}
	const queryParameter = req.query;
	const carStatus = queryParameter.status;
	const minPrice = queryParameter.min_price;
	const maxPrice = queryParameter.max_price;
	// to detect the size of the query object
	const keys = Object.keys(queryParameter);

	if (keys.length === 1) {
		const query = cars.filter(c => c.status === carStatus);
		if (query.length > 0) 
			return res.status(200).json({ status: 200, data: query });
		else 
			return res.status(404).json({ status: 404, error: 'No search Data found for that query' });
	} else if (keys.length === 3) {
		const range = cars
		.filter(p => p.status === carStatus && p.price >= minPrice && p.price <= maxPrice);

		if (range.length > 0) res.status(200).json({ status: 200, data: range });
		else return res.status(404).json({ status: 404, error: 'No search Data found for that query' });
	} else {
		return res.status(200).json({
			status: 200,
			data: cars,
		});
	}

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async fetchId(req, res) {
	const foundCar = cars.find(c => c.id === parseInt(req.params.id, 10));
	if (!foundCar) {
		return res.status(404).json({
			status: 404,
			error: 'Could not find Car with a given ID',
		});
	}
	return res.status(200).json({
		status: 200,
		data: foundCar,
	});  
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async create(req, res) {
	const { error } = Joi.validate(req.body, validateCar);
	if (error) {
		const errorMessage = error.details[0].message;
		return res.status(400).json({
        status: 400,
        error: errorMessage
      });
	}else{
		if (!req.files.picture){
			return res.status(400).json({
				status: 400,
				error: 'Image is required',
			});
		}else {
			//image upload
			const filename = req.files.picture.path;
			cloudinary.v2.uploader.upload(filename,{tags:'Automart Images'},function(err,image){
				if (err){ console.warn(err);}
				else{
					const imageUrl = image.secure_url;
					const carId = parseInt(cars.length + 1, 10);
					const userId = parseInt(req.body.owner, 10);
					const newCar = {
						id: carId,
						owner: userId,
						created_on: DateTime,
						state: req.body.state,
						status: 'available',
						price: req.body.price,
						manufacture: req.body.manufacture,
						model: req.body.model,
						body_type: req.body.body_type,
						description: req.body.description,
						image: imageUrl
					};

					cars.push(newCar);
					return res.status(201).json({
						status: 201,
						data: newCar
					});
				}
			});
		}
	}    
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async updatePrice(req, res) {
	const { error } = Joi.validate(req.body, updateCarPrice);
	if (error) {
		const errorMessage = error.details[0].message;
		return res.status(400).json({
        status: 400,
        error: errorMessage
      });
	}else {
		const updateCarPrice = cars.find(c => c.id === parseInt(req.params.id, 10));
	    if (!updateCarPrice) 
			return res.status(404).json({status: 404,error: 'Could not find Car with a given ID',});
		const newPrice = req.body.price;
		updateCarPrice.price = newPrice;
		res.status(200).json({
			status: 200,
			data: updateCarPrice,
		});
	}  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async updateStatus(req, res) {
  	const { error } = Joi.validate(req.body, updateCarStatus);
	if (error) {
		const errorMessage = error.details[0].message;
		return res.status(400).json({
        status: 400,
        error: errorMessage
      });
	}else {
		const updateCarStatus = cars.find(s => s.id === parseInt(req.params.id, 10));
	    if (!updateCarStatus) 
			return res.status(404).json({status: 404,error: 'Could not find Car with a given ID',});
		const markAsSold = req.body.status;
		updateCarStatus.status = markAsSold;
		res.status(200).json({
			status: 200,
			data: updateCarStatus,
		});
	}		  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async delete(req, res) {
	const carToDelete = cars.find(c => c.id === parseInt(req.params.id, 10));
	if (!carToDelete) 
		return res.status(404).json({status: 404,error: 'Could not find Car with a given ID',});

	const index = cars.indexOf(carToDelete);
	cars.splice(index, 1);
	res.status(200).json({
		status: 200,
		data: "Car Ad successfully Deleted"
	});    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async report(req, res) {
	const { error } = Joi.validate(req.body, fraudValidation);
	if (error) {
		const errorMessage = error.details[0].message;
		return res.status(400).json({
        status: 400,
        error: errorMessage
      });
	}
	const carToReport = cars.find(c => c.id === parseInt(req.body.car_id, 10));
	
	if (!carToReport) 
		return res.status(404).json({status: 404,error: 'Could not find Car with a given ID',});

	const newFraud = {
		id: frauds.length + 1,
		car_id: req.body.car_id,
		reason: req.body.reason,
		description: req.body.description
	}
	frauds.push(newFraud);
	res.status(201).json({
		status: 201,
		data: newFraud
	});    
}

}

export default Car;

