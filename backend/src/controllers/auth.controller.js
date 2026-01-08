import pool from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
    const {email, password} = req.body;

    const result = await pool.query(
        'SELECT id, name, email, password_hash FROM users WHERE email = $1',
        [email]
    );

    if (result.rows.length === 0) {
        return res.status(401).json({error: 'Invalid email or password'});
    }

    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
        return res.status(401).json({error: 'Invalid email or password'});
    }

    const token = jwt.sign(
        {user_id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
    
    res.json({token});
}

export async function register(req, res) {
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
        [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
}