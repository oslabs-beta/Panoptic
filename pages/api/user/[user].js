import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
const getEndPointData = async (username) => {
  dbConnect();

  const foundUser = await User.findOne({ _id: username });
  if (foundUser) {
    console.log(username + ' user found');
    console.log(foundUser.endpoints)
    return (JSON.stringify(foundUser.endpoints))
  } else {
    console.log(username + ' user not found');
    return;// Empty return it triggers No profile data
  }
}
const handler = async (req, res) => {
  console.log('in api/user handler')
  const userData = await getEndPointData(req.query.user); //req.query.user
  return res.send(userData)
}

export default handler;