import { mongoose } from 'mongoose';
const User = require('../../models/loginModel');
const createUser = async (req, res) => {
  // Check method type ie post/get etc
  if (req.method === 'POST') {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.tuf6p.mongodb.net/Panoptic?retryWrites=true&w=majority')
    console.log('~~~Connected to mongoDB~~~');

    console.log('Called createUser POST');
    // Passing in username / pass into Mongoose Schema from req.body
    const newUser = await new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        mongoose.connection.close()
        console.log('Closed Mongo connection');
        return res.json('Error creating user ->', err);
      }
      res.send(user.username, ' Created')
      mongoose.connection.close()
      console.log('Closed Mongo connection');
    });
  }
}

export default createUser;