import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import { signupValidation, signinValidation } from '../helper/validation';
import dotenv from 'dotenv';

dotenv.config();

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
    }

    const emailFound = users.find(c => c.email === req.body.email);
    if (emailFound) {
     return res.status(409).json({ status: 409, error: 'Email Exists' });
    }
    else{
      const admin = users.length;
      const newUser = {
        id: users.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address: req.body.address,
        password: bcrypt.hashSync(req.body.password, 10),
        is_admin: admin == 0? true:false
    };

    users.push(newUser);
      	// delete newUser.password;

      	jwt.sign({ id: newUser.id, email: newUser.email, admin: newUser.is_admin }, process.env.SECRETKEY, { expiresIn: '24h' }, (err, token) => {
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

  /**
 *
 * @param {create a meetup} req
 * @param {*returns success if created} res
 */
  async login(req, res) {
    const { error } = Joi.validate(req.body, signinValidation);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }

    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const foundUser = users.find(e => e.email === userEmail);

    if (!foundUser) {
      return res.status(401).json({ status: 401, error: 'email does not exist' });
    }

    const pass = bcrypt.compareSync(userPassword, foundUser.password);
    if (pass) {
      // delete foundUser.password;

      jwt.sign({ id: foundUser.id, email: foundUser.email, admin: foundUser.is_admin }, process.env.SECRETKEY, {expiresIn: '24h'}, (err, token) => {
        foundUser.token = token;
        return res.status(200).json(
        {
          status: 200,
          data: foundUser
        });
      });
    }
    else{
      return res.status(401).json({
        status: 401,
        message: "invalid credential"
      })
    }  
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
