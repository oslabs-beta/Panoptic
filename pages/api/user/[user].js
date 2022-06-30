import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
import dbConnect from '../../../lib/dbConnect';
const getEndPointData = async (username) => {
  await dbConnect();

  // Find user username": "sampledata"
  // Data we need is endpoints."https://sampledata.coateam"
  const foundUser = await User.findOne({ _id: username });
  if (foundUser) {
    console.log(username + ' user found');
    console.log(foundUser)
    return foundUser;
  } else {
    console.log(username + ' user not found');
    return;// Empty return it triggers No profile data
  }
}
const handler = async (req, res) => {
  const userData = await getEndPointData(req.query.user);//req.query.user
  res.send((userData))
}

export default handler;