const mongoose = require('mongoose');
const Cookies = require('cookies');
const bcrypt = require('bcrypt');
import dbConnect from '../../lib/dbConnect';
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
const User = require('../../models/loginModel');

// Api/login

const handler = async (req: Request, res: Response) => {
  await dbConnect();
  const cookies = new Cookies(req, res);
  // Check method type ie post/get etc
  if (req.method === 'POST') {
    console.log('LOGIN called with data ', req.body);
  

    // store username / pass from req.body
    const { username, password } = req.body;
    // Check if user exists and then compare pass if so
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      console.log('Login username found');
      //  User exist
      // Checking password with hash password on server
      bcrypt.compare(
        password,
        foundUser.password,
        function (err: any, result: any) {
          if (err) {
            console.log('Error comparing hashed password on login');
            return res
              .status(401)
              .send('Error comparing hashed password on login');
          } else {
            if (result) {
              // Login pass correct
              // Set Login Cookie
              cookies.set('userId', foundUser._id);
              // return res.status(200).send('Logged in and new cookie set');
              return res.status(201).redirect('/sample-test');
            } else {
              // Login pass wrong
              return res.status(401).send('Password wrong');
            }
          }
        }
      ); // End hash password compare
    } else {
      // create user as they don't exist
      console.log('Create user called');
      // Assign username / pass to varibles so we can hash pass
      const { username, password } = req.body;
      // Hashing function with bcrypt
      bcrypt.hash(password, 10, async function (err: any, hash: any) {
        if (err) {
          // Error when hashing password
          console.log('Error hashing password');
          return res.status(401).send('Error hashing password');
        } else {
          // Store hash in your password DB.
          
          const newUser = await new User({
            username: username,
            password: hash,
          });
          await newUser.save();
          // Set Login Cookie
          cookies.set('username', username);
          return res.status(201).send(`Created user ` + newUser.username);
        }
      });
    }
  }
};

export default handler;
