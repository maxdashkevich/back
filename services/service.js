import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model.js';

export class UsersService {
  addUser = async (body) => {
    return User.create({
        ...body
    });
  }

  getUser = async (id) => {
    return User.findById(id);
  }

  getUsers = async () => {
    return User.find({});
  }

  updateUser = async (id, body) => {
    return User.findOneAndUpdate({ _id: id }, { $set: {...body} });
  }

  deleteUser = async (id) => {
    return User.deleteOne({ _id: id });
  }

  addAvatar = async (path, id) => {
    return User.findOneAndUpdate({ _id: id }, { $set: { avatar: path } });
  }

  login = async (login, password) => {
    const user = await User.findOne({login});
    if (user == null) {
      return 'No such user';
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = this.generateAccessToken(user.login);
        const refreshToken = jwt.sign(user.login, process.env.REFRESH_TOKEN_SECRET);
        user.tokens.accessToken = accessToken;
        user.tokens.refreshToken = refreshToken;
        user.save();

        return {accessToken, refreshToken};
      } else {
        return 'Wrong password';
      }
    } catch {
      throw new Error('Unable to login');
    }
  }

  generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  }

  generateToken = async (token) => {
    const refreshToken = token;
    const user = await User.findOne({'tokens.refreshToken': refreshToken});
    if (refreshToken == null) throw new Error;
    if (!user) throw new Error;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) throw new Error;
      const accessToken = this.generateAccessToken(user);
      return {accessToken};
    })
  }
}