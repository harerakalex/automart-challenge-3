import fs from 'fs';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import { signupValidation } from '../helper/validation';

class User {
/**
 *
 * @param {login user} req
 * @param {*token on success} res
 */


  async signup(req, res) {
    const { error } = Joi.validate(req.body, signupValidation);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    } else {
      const emailFound = users.find(c => c.email === req.body.email);
      if (emailFound) {
      	return res.status(409).json({ status: 409, error: 'Email Exists' });
      }
      else{
      	const newUser = {
      		id: users.length + 1,
      		first_name: req.body.first_name,
      		last_name: req.body.last_name,
      		email: req.body.email,
      		address: req.body.address,
      		password: bcrypt.hashSync(req.body.password, 10),
      		is_admin: false,
      	};

      	users.push(newUser);
      	delete newUser.password;

      	jwt.sign({ id: newUser.id, email: newUser.email, admin: newUser.is_admin }, 'automart-key', { expiresIn: '24h' }, (err, token) => {
      		newUser.token = token;
      		return res.status(201).json(
      		{
      			status: 201,
      			data: newUser,
      		},
      		);
      	});
      }
      
    }
  }

  /**
 *
 * @param {create a meetup} req
 * @param {*returns success if created} res
 */
  async login(req, res) {

  }

  /**
 *
 * @param {*} req
 * @param {*} res
 */
  async logout(req, res) {

  }
}

export default User;
