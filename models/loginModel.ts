import mongoose, { Schema } from 'mongoose';
import { MongoUser } from '../types';

const userSchema = new Schema<MongoUser>(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    endpoints: { type: Object, default: {} },
    github: { type: Schema.Types.Mixed, default: false },
  },
  { minimize: false }
);

// This or statement fixes mongoose error on NextJS->
//"Mongoose Cannot Overwrite Model Once Compiled Error"
module.exports = mongoose.models.users || mongoose.model('users', userSchema);
