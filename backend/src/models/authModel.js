const db = require('../config/db');

async function login(username, password) {
    const query = `SELECT * FROM USERS WHERE username = ?`;
    const [rows] = await db.query(query, [username]);
    const user = rows[0];
    return rows;
}

async function register(username, password) {

}

async function createSession(userId, token, expiresAt) {
    const query = `INSERT INTO SESSIONS (user_id, session_token, expires_at) VALUES (?, ?, ?)`
    const [result] = await db.query(query, [userId, token, expiresAt]);
    return result;
}

export default { login, register, createSession };