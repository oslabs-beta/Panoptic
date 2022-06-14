import { mongoose } from 'mongoose';
import Cookies from 'cookies'

const User = require('../../models/loginModel');

// Api/login

const handler = async (req, res) => {
  const cookies = new Cookies(req, res)
  // Check method type ie post/get etc
  if (req.method === 'POST') {
    console.log('LOGIN called with data ', (req.body));
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.tuf6p.mongodb.net/Panoptic?retryWrites=true&w=majority')
    console.log('~~~Connected to mongoDB~~~');
    // store username / pass from req.body
    const { username, password } = req.body;
    // Check if user exists and then compare pass if so
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {// If not null User exist
      if (foundUser.password === password) {
        // Set Login Cookie 
        cookies.set('login', true)
        res.status(201).send('Logged in and new cookie set')
      } else {
        res.status(401).send('Password wrong')
      }
    } else {
      res.status(404).send('Username doesn\'t exist')
    }
    mongoose.connection.close()
    console.log('Closed Mongo connection');

  }
}


export default handler;
