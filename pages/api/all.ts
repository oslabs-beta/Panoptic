import mongoose from 'mongoose';
const User = require('../../models/loginModel');
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const getAllData = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    console.log('Get all data request called');
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.tuf6p.mongodb.net/Panoptic?retryWrites=true&w=majority')
    console.log('~~~Connected to mongoDB~~~');

    // Getting all data from our user database
    const allData = await User.find({});

    mongoose.connection.close()
    console.log('Closed Mongo connection');

    res.status(200).send(allData);
  }

}

export default getAllData;