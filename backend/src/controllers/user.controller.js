import pool from '../utils/db.js';

export async function getMe(req, res) {
    const userId = req.user.user_id;

    const result = await pool.query(
        'SELECT id, name, email, created_at FROM users WHERE id = $1', [userId]
    )

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
}   