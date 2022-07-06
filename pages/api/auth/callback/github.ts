import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from '../../../../lib/dbConnect';
import passport from "../../../../lib/passport-github-auth";
const session = require('express-session');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const bcrypt = require('bcrypt');
const User = require('../../../../models/loginModel');

export default nextConnect().use(session({
  secret: 'test'
})).get(
    passport.authenticate("github",{ failureRedirect: '/' }),
    async (req: NextApiRequest & { user: any }, res: NextApiResponse) => {
    const cookies = new Cookies(req, res);
    await dbConnect();
    // store username / pass from req.body

     
    console.log('LOGIN called with data ', req.user);
    await dbConnect();
    console.log('~~~Connected to mongoDB~~~');
    // store username / pass from req.body
    const { username, nodeId, token, photos, refresh } = req.user;
    console.log(req.user);
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
      console.log('Create user called in github.ts');
      console.log('req.user', username, nodeId, token);
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
          await dbConnect();
          const newUser = await new User({
            username: username,
            password: hash,
            github: {
              profilePic: photos[0].value,
              token: token,
              refresh: refresh,
              repos: []
            }
          });
          await newUser.save();
          // Set Login Cookie
          cookies.set('userId', newUser._id);
          return res.status(201).redirect('/dashboard');
        }
      });

    };
  }
);
