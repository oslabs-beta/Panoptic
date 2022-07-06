import mongoose from 'mongoose';
import { DBOptions } from '../types';

let cached:any = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connect: null, promise: null }
}

const dbConnect = async ():Promise<any> => {
  if (cached.connect) {
    return cached.connect;
  };
  if (!cached.promise) {
    const options:DBOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI, options).then((mongoose) => {
      return mongoose;
    });
  };
  cached.connect = await cached.promise;
  return cached.connect;
};

export default dbConnect;