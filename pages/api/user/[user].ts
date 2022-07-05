import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
import { Request, Response } from 'express';


const getEndPointData = async (username:string):Promise<string | void> => {
  await dbConnect();

  const foundUser = await User.findOne({ _id: username });
  if (foundUser) {
    return (JSON.stringify(foundUser.endpoints))
  } else {
    return;
  };
};
const handler = async (req:Request | any, res:Response) => {
  const userData = await getEndPointData(req.query.user);//req.query.user
  res.send((userData))
};

export default handler;