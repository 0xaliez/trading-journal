import pool from '../utils/db.js';

export async function createUser(req, res) {
    const { name, email, password_hash } = req.body;

    const result = await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
        [name, email, password_hash]
    );
    
    res.status(201).json(result.rows[0]);
    console.log('User created with ID:', result.rows[0].id);
}

export async function getUserById(req, res) {
    const { user_id } = req.params;

    const result = await pool.query(
        'SELECT id, name, email, created_at FROM users WHERE id = $1', [user_id]
    )

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
}   