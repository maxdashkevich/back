import express from 'express';
import { UsersController } from "../controllers/controller.js";
import { upload } from "../middlewares/multer-middleware.js";
import { validate } from "../middlewares/joi-validation-middleware.js";
import { createUserSchema, updateUserSchema } from "../validation-schemes/user-schema.js";
import { auth } from "../middlewares/auth-middleware.js";

export const router = express.Router();

const controller = new UsersController();

router
  .get('/', auth, controller.getUsers)
  .get('/:id', controller.getUser)
  .post('/', validate(createUserSchema), controller.add)
  .put('/:id', validate(updateUserSchema), controller.update)
  .delete('/:id', controller.delete)
  .post('/avatar/:id', upload, controller.addAvatar)
  .post('/login', controller.login)
  .post('/token', controller.generateToken);