const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  endPoints: [{ type: String }]
});

// This or statement fixes mongoose error on NextJS->
//"Mongoose Cannot Overwrite Model Once Compiled Error"
module.exports = mongoose.models.users || mongoose.model('users', userSchema);
