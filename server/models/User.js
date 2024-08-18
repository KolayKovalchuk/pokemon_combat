import mongoose from 'mongoose'

// User Model
const userSchema = new mongoose.Schema({
    address: { type: String, unique: true },
  });

const User = mongoose.model('User', userSchema);

export default User