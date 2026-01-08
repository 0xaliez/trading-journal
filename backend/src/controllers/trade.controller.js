import pool from '../utils/db.js';

export async function createTrade(req, res) {

    const {
        account_id,
        symbol,
        direction,
        entry_price,
        exit_price,
        stop_loss,
        take_profit,
        lot_size,
        risk_amount,
        opened_at,
    } = req.body;

    const result = await pool.query(
        `INSERT INTO trades 
        (account_id, symbol, direction, entry_price, exit_price, stop_loss, take_profit, lot_size, risk_amount, opened_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING id, account_id, symbol, direction, entry_price, exit_price, stop_loss, take_profit, lot_size, risk_amount, opened_at, closed_at, created_at`,
        [account_id, symbol, direction, entry_price, exit_price, stop_loss, take_profit, lot_size, risk_amount, opened_at]
    );

    res.status(201).json(result.rows[0]);
}

export async function closeTrade(req, res) {
    const { trade_id } = req.params;
    const { exit_price } = req.body;

    const result = await pool.query(
        `UPDATE trades 
        SET exit_price = $1, closed_at = NOW() 
        WHERE id = $2 
        RETURNING id, account_id, symbol, direction, entry_price, exit_price, stop_loss, take_profit, lot_size, risk_amount, opened_at, closed_at, created_at`,
        [exit_price, trade_id]
    );

    res.json(result.rows[0]);
}

export async function getTradesByAccount(req, res) {
    const { account_id } = req.params;

    const result = await pool.query(
        `SELECT * FROM trades 
        WHERE account_id = $1
        ORDER BY opened_at DESC`,
        [account_id]
    ); 

    res.json(result.rows);
}