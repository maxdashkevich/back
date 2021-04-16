import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import { User } from '../models/user-model.js';

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({'tokens.accessToken': token});
    if (!user) {
      throw new Error;
    }
    req.token = token;
    req.user = user;
    next()
  } catch (e) {
    res.status(401).send({Error: 'You are not authorized'});
  }
}