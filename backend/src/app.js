import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import accountRoutes from './routes/accounts.routes.js';
// import tradeRoutes from './routes/trade.routes.js';

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
// app.use('/trades', tradeRoutes);

export default app;
