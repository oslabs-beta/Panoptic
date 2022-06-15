const mongoose = require('mongoose');
const User = require('../../models/loginModel');
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const createUser = async (req: Request, res: Response) => {
  // Check method type ie post/get etc
  if (req.method === 'POST') {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.tuf6p.mongodb.net/Panoptic?retryWrites=true&w=majority')
    console.log('~~~Connected to mongoDB~~~');

    console.log('Called createUser POST');
    // Passing in username / pass into Mongoose Schema from req.body
    const newUser = await new User(req.body);
    interface User {
      username: string
      password: string
      endpoints: any
    }
    newUser.save((err: ErrorRequestHandler, user: User) => {
      if (err) {
        mongoose.connection.close()
        console.log('Closed Mongo connection with error');
        return res.json(err);
      }
      res.send(user.username)
      mongoose.connection.close()
      console.log('Closed Mongo connection without error');
    });
  };
};

export default createUser;