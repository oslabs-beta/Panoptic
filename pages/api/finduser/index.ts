const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
import { Request, Response, ErrorRequestHandler } from 'express';

const getUserData = async (req:Request, res:Response):Promise<void> => {
  const { username } = req.body;
  try {
    await dbConnect();
    await User.findOne({_id: username}, (err:ErrorRequestHandler, user:any) => {
      if (err) return console.log('err getting username', err);
      if (user) return (JSON.stringify(user));
    });
  }
  catch (error) {
    if (error) console.log('damn...');
  };
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