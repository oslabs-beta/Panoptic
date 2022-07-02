import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "../../../../lib/passport-github-auth";
const session = require('express-session');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const bcrypt = require('bcrypt');
const User = require('../../../../models/loginModel');

import nextSession from "next-session";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';


export default nextConnect().use(session({
  secret: 'test'
})).get(
    passport.authenticate("github",{ failureRedirect: '/' }),
    async (req: NextApiRequest & { user: any }, res: NextApiResponse) => {
      const cookies = new Cookies(req, res);
      // you can save the user session here. to get access to authenticated user through req.user
      console.log('Here i am')
      // console.log(req.user)

     
        console.log('LOGIN called with data ', req.user);
        await mongoose.connect(
          'mongodb+srv://admin:admin@cluster0.tuf6p.mongodb.net/Panoptic?retryWrites=true&w=majority'
        );
        console.log('~~~Connected to mongoDB~~~');
        // store username / pass from req.body
        const { username, nodeId, token } = req.user;
        const { url } = req.user._json
        // Check if user exists and then compare pass if so
        const foundUser = await User.findOne({ username: username });
        if (foundUser) {
          console.log('Login username found');
          cookies.set('userId', foundUser._id);
          return res.status(201).redirect('/dashboard');
          //  User exist
          // Checking password with hash password on server
        } else {
          // create user as they don't exist
          console.log('Create user called');
          console.log('req.user', username, nodeId, token, url);
          // Assign username / pass to varibles so we can hash pass
          // const { username, password } = req.body;
          // Hashing function with bcrypt
          bcrypt.hash(nodeId, 10, async function (err: any, hash: any) {
            if (err) {
              // Error when hashing password
              console.log('Error hashing password', nodeId);
              return res.status(401).send('Error hashing password');
            } else {
              // Store hash in your password DB.
              await mongoose.connect(
                'mongodb+srv://admin:admin@cluster0.tuf6p.mongodb.net/Panoptic?retryWrites=true&w=majority'
              );
              const newUser = await new User({
                username: username,
                password: hash,
                github: {
                  token: token,
                  url: url
                }
              });
              await newUser.save();
              mongoose.connection.close();
              console.log('Closed Mongo connection');
              // Set Login Cookie
              cookies.set('userId', newUser._id);
              return res.status(201).redirect('/dashboard');
            }
          });
        
      }

    //  return res.redirect("/api/login");
    }
);
