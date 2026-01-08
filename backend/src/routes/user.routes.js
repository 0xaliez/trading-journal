import express from 'express';
import { createUser, getMe } from '../controllers/user.controller.js';
import { validateUUID } from '../middlewares/validateUUID.js';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.use(authMiddleware)
userRouter.get('/me', getMe);

export default userRouter;