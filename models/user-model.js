import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true, 
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    set: value => bcrypt.hashSync(value, bcrypt.genSaltSync(10))
  },
  role: {
    type: String,
    default: 'user'
  },
  avatar: {
    type: String
  },
  tokens: {
    accessToken: String,
    refreshToken: String
  }
}, {versionKey: false});

export const User = mongoose.model('User', userSchema);