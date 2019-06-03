import Joi from 'joi';

const signupValidation = Joi.object({
	first_name: Joi.string().alphanum().min(3).max(30).required(),
	last_name: Joi.string().alphanum().min(3).required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).min(3).required(),
	address: Joi.string().alphanum().min(3).required(),
	password: Joi.string().min(3).required(),
});

// Sign in validation
const signinValidation = Joi.object({
	email: Joi.string().email({ minDomainAtoms: 2 }).min(3).required(),
	password: Joi.string().min(3).required(),
});

// validating a car
const validateCar = Joi.object({
	owner: Joi.number().integer().required(),
	manufacture: Joi.string().alphanum().min(3).required(),
	model: Joi.string().min(3).required(),
	price: Joi.number().precision(4).positive().min(2).required(),
	state: Joi.string().min(3).required(),
	body_type: Joi.string().min(3).required(),
	description: Joi.string().max(150).required(),
});

// validating price for update
const updateCarPrice = {
	price: Joi.number().precision(4).positive().min(2).required()
};


// validating order
const orderValidation = Joi.object({
	buyer_id: Joi.number().integer().required(),
    car_id: Joi.number().integer().required(),
    amount: Joi.number().precision(4).positive().min(2).required(),
});


module.exports = { 
	signupValidation,
	signinValidation,
	validateCar,
	updateCarPrice,
	orderValidation,
};