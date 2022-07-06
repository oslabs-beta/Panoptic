const User = require('../../models/loginModel');
import dbConnect from '../../lib/dbConnect';

const validUser = async (req, res) => {
  const { userID } = req.body;
  await dbConnect();
  try {
    const foundUser = await User.findOne({ _id: userID });
    return res.status(200).send((foundUser) ? true : false);
  } catch (err) {
    return res.status(500).send(false);
  }

}

export default validUser;