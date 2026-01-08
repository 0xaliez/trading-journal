import express from 'express';
import { createAccount, getAccountByUser } from '../controllers/account.controller.js';
import { validateUUID } from '../middlewares/validateUUID.js';
import { auth } from '../middlewares/auth.js';
import { authMiddleware } from '../middleware/auth.js';

const accountRouter = express.Router();

accountRouter.use(authMiddleware);
accountRouter.post('/', createAccount);
accountRouter.get('/user/:user_id', validateUUID('user_id'), getAccountByUser);

export default accountRouter;