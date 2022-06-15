import mongoose, { Schema } from 'mongoose';

// interface Endpoints {
// }

interface User {
  username: string
  password: string
  endpoints: any
}

const userSchema = new Schema<User>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  endpoints: { type: Object, default: {} }
}, { minimize: false });

// This or statement fixes mongoose error on NextJS->
//"Mongoose Cannot Overwrite Model Once Compiled Error"
module.exports = mongoose.models.users || mongoose.model('users', userSchema);