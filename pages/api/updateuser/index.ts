import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
import { Request, Response } from 'express';

const updateUserData = async (
  username: string,
  updated: string,
  reponame: string
): Promise<string | void> => {
  await dbConnect();

  // const filter = { _id: username}
  // const updateThis = {$set: {'github.repos': [updated]}}

  // try {
  //   return await User.findOneAndUpdate(filter, updateThis);
  // }
  // catch (err) {
  //   return console.log(err);
  // }
  // const foundUser = await User.findOne({ _id: username });
  // console.log(username);
  let currentUser = await User.findOne({ _id: username });
  // console.log(currentUser);
  // currentUser.github.repos.push(updated); //push in object
  if (currentUser.github.repos[reponame]) {
    currentUser.github.repos[reponame].repoPoints.push(updated);
  } else {
    currentUser.github.repos[reponame] = { repoPoints: [updated] };
  }

  // console.log(currentUser);

  await currentUser.markModified('github');
  await currentUser.save();
};
const handler = async (req: Request | any, res: Response) => {
  console.log('in update handler');
  console.log(req.body);
  const userData = await updateUserData(
    req.body.id,
    req.body.url,
    req.body.reponame
  );
  res.send(userData);
};

export default handler;
