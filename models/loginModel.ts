import mongoose, { Schema } from 'mongoose';
import { MongoUser } from '../types';

const userSchema = new Schema<MongoUser>(
  {
    endpoints: { type: Object, default: {} },
  },
  { minimize: false }
);

// This or statement fixes mongoose error on NextJS->
//"Mongoose Cannot Overwrite Model Once Compiled Error"
module.exports = mongoose.models.users || mongoose.model('users', userSchema);
