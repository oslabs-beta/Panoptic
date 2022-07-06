import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
import { Request, Response } from 'express';


const updateUserData = async (username:string, updated:[]):Promise<string | void> => {
  await dbConnect();
  
  const filter = { _id: username}
  const updateThis = {$set: {'github.repos': [updated]}}

  try {
    return await User.findOneAndUpdate(filter, updateThis);
  }
  catch (err) {
    return console.log(err);
  }
};
const handler = async (req:Request | any, res:Response) => {
  console.log('in update handler')
  const userData = await updateUserData(req.query.user, req.query.updated);
  res.send(userData)
};

export default handler;