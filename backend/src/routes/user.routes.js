import express from 'express';
import { createUser, getUserById } from '../controllers/user.controller.js';
import { validateUUID } from '../middlewares/validateUUID.js';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/:user_id', validateUUID('user_id'), getUserById);

export default userRouter;