import mongoose from 'mongoose';
import dbConnect from '../../lib/dbConnect';

const User = require('../../models/loginModel');
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const getAllData = async (req: Request, res: Response):Promise<void> => {
  if (req.method === 'GET') {
    await dbConnect();
    const allData = await User.find({});
    res.status(200).send(allData);
  };
};

export default getAllData;