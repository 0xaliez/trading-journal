import express from 'express';
import { createAccount, getAccountByUser } from '../controllers/account.controller.js';
import { validateUUID } from '../middlewares/validateUUID.js';

const accountRouter = express.Router();

accountRouter.post('/', createAccount);
accountRouter.get('/user/:user_id', validateUUID('user_id'), getAccountByUser);

export default accountRouter;