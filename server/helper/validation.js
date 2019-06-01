import Joi from 'joi';

const signupValidation = Joi.object({
	first_name: Joi.string().alphanum().min(3).max(30).required(),
	last_name: Joi.string().alphanum().min(3).required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).min(3).required(),
	address: Joi.string().alphanum().min(3).required(),
	password: Joi.string().min(3).required(),
})

module.exports = { signupValidation };