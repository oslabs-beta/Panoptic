const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
import { Request, Response, ErrorRequestHandler } from 'express';

const getUserData = async (req: Request, res: Response): Promise<void> => {
  console.log('Got user request');
  const { email } = req.body;
  try {
    await dbConnect();
    await User.findOne(
      { email: email },
      (err: ErrorRequestHandler, user: any) => {
        if (err) return res.send(err);
        if (user) return res.send(user);
      }
    );
  } catch (error) {
    if (error) console.log(error);
  }
};

// const getUserData = async (username) => {
//   await dbConnect();

//   // Find user username": "sampledata"
//   // Data we need is endpoints."https://sampledata.coateam"
//   const foundGetUser = await User.findOne({ _id: username });
//   if (foundGetUser) {
//     console.log(username + ' getUser found');
//     return foundGetUser
//   } else {
//     return console.log(username + ' getUser not found');
//   };
// };
// const userHandler = async (req, res) => {
//   const userData = await getUserData(req.query.user);//req.query.user
//   res.json(userData)
// };

export default getUserData;
