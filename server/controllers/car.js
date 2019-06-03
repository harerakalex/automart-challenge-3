import Joi from 'joi';
import { validateCar } from '../helper/validation';
import timeStamp from '../helper/timeStamp';
import cars from '../models/cars';
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
 
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async fetchId(req, res) {
  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async fetchAvailable(req, res) {
  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async fetchRange(req, res) {
  
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
  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async updateStatus(req, res) {
  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async delete(req, res) {
    
}

}

export default Car;

