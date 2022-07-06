import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
import { Request, Response } from 'express';


const getEndPointData = async (username:string):Promise<string | void> => {
  await dbConnect();

  const foundUser = await User.findOne({ _id: username });
  if (foundUser) {
    console.log(username + ' user found');
    console.log(foundUser.endpoints)
    return (JSON.stringify(foundUser.endpoints))
  } else {
    console.log(username + ' user not found');
    return;
  };
};
const handler = async (req:Request | any, res:Response) => {
  console.log('in api/user handler')
  const userData = await getEndPointData(req.query.user);//req.query.user
  res.send((userData))
};

export default handler;