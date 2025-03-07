const db = require('../config/db');

async function getSession(token) {
    const query = `SELECT * FROM SESSIONS WHERE session_token = ? AND expires_at > NOW()`;
    const [rows] = await  db.query(query, [token]);
    return rows;
}


async function login(username) {
    const query = `SELECT * FROM USERS WHERE username = ?`;
    const [rows] = await db.query(query, [username]);
    return rows[0];
}

async function createSession(userId, token, expiresAt) {
    const query = `INSERT INTO SESSIONS (user_id, session_token, expires_at) VALUES (?, ?, ?)`
    const [result] = await db.query(query, [userId, token, expiresAt]);
    return result;
}

//logout
async function deleteSession(token) {
    const query = `DELETE FROM SESSIONS WHERE session_token = ?`;
    const [result] = await db.query(query, [token]);
    return result;
}





module.exports = {
    getSession,
    deleteSession,
    login,
    createSession
}