import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
import { Request, Response } from 'express';

const getEndPointData = async (email: string): Promise<string | void> => {
  await dbConnect();

  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    console.log(email + ' user found');
    console.log(foundUser.endpoints);
    return JSON.stringify(foundUser.endpoints);
  } else {
    console.log(email + ' user not found');
    return;
  }
};
const handler = async (req: Request | any, res: Response) => {
  console.log('in api/user handler');
  const userData = await getEndPointData(req.query.user); //req.query.user
  res.send(userData);
};

export default handler;
