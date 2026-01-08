import express from 'express'
import { validateUUID } from '../middlewares/validateUUID.middleware.js'
import { createTrade, closeTrade, getTradesByAccount } from '../controllers/trade.controller.js'
import { authMiddleware } from '../middlewares/auth.js'

const tradeRouter = express.Router()

tradeRouter.use(authMiddleware)
tradeRouter.post('/', createTrade)
tradeRouter.patch('/:trade_id/close', validateUUID('trade_id'), closeTrade)
tradeRouter.get('/account/:account_id', validateUUID('account_id'), getTradesByAccount)

export default tradeRouter