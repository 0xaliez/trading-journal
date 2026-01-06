import pool from './utils/db.js';

const res = await pool.query(`INSERT INTO users (name, email, password_hash) VALUES ('Ali', 'ali@example.com', 'password123'),('John', 'john@example.com', 'passw3') RETURNING *;`);
console.log(res.rows[0]);

// Select all users
const users = await pool.query('SELECT * FROM users;');
console.log(users.rows);

await pool.end();
