import mongoose from 'mongoose';
const User = require('../../../models/loginModel');
const getEndPointData = async (username) => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('~~~Connected to mongoDB~~~');
  // Find user username": "sampledata"
  // Data we need is endpoints."https://sampledata.coateam"
  const foundUser = await User.findOne({ username: username });
  if (foundUser) {
    console.log(username + ' user found');
    return (JSON.stringify(foundUser.endpoints))
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