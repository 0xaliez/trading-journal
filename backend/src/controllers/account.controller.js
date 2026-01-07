import pool from '../utils/db.js';

export async function createAccount(req, res) {
    const {
        user_id,
        account_name,
        account_type,
        starting_balance,
        current_balance,
        daily_drawdown_limit,
        max_drawdown_limit
    } = req.body;

    const result = await pool.query(
        `INSERT INTO accounts 
        (user_id, account_name, account_type, starting_balance, current_balance, daily_drawdown_limit, max_drawdown_limit) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id, user_id, account_name, account_type, starting_balance, current_balance, daily_drawdown_limit, max_drawdown_limit, created_at`,
        [user_id, account_name, account_type, starting_balance, current_balance, daily_drawdown_limit, max_drawdown_limit]
    );

    res.status(201).json(result.rows[0]);
}

export async function getAccountByUser(req, res) {
    const { user_id } = req.params
    
    const result = await pool.query(
        `SELECT id, user_id, account_name, account_type, starting_balance, current_balance, daily_drawdown_limit, max_drawdown_limit, created_at 
        FROM accounts 
        WHERE user_id = $1`,
        [user_id]
    );

    res.json(result.rows);
}