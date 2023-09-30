import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Must provide username'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Must provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Must provide password'],
  },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
