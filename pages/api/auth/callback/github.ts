import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
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
    await mongoose.connect(process.env.MONGO_URI);
    // store username / pass from req.body

    type username = string;
    type nodeId = string;
    type token = string;
    type url = string;

    const { username, nodeId, token } = req.user;
    const { url } = req.user._json
    // Check if user exists and then compare pass if so
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      cookies.set('userId', foundUser._id);
      return res.status(201).redirect('/dashboard');
      //  User exist
      // Checking password with hash password on server
    } else {
      bcrypt.hash(nodeId, 10, async function (err: any, hash: any) {
        if (err) {
          return res.status(401).send('Error hashing password');
        } else {
          await mongoose.connect(process.env.MONGO_URI);
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
          cookies.set('userId', newUser._id);
          return res.status(201).redirect('/sample-test');
        }
      });
    };
  }
);
