import mongoose from 'mongoose';
import { DBOptions } from '../types';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connect: null, promise: null }
}

const dbConnect = async () => {
  if (cached.connect) {
    return cached.connect;
  };
  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    cached.promise = mongoose.connect(process.env.MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  };
  cached.connect = await cached.promise;
  return cached.connect;
};

export default dbConnect;