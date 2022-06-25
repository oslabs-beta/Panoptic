import mongoose from 'mongoose';
import dbConnect from '../../lib/dbConnect';

const User = require('../../models/loginModel');
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const getAllData = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    console.log('Get all data request called');
    await dbConnect();

    // Getting all data from our user database
    const allData = await User.find({});

    res.status(200).send(allData);
  }

}

export default getAllData;