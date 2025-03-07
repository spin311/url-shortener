const db = require('../config/db');

async function createUser(username, password, organization_id, user_type="user") {
    const query = `INSERT INTO USERS (username, password, organization_id, user_type) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [username, password, organization_id, user_type]);
    return result;
}

async function updateUser(userId, fields) {
    const updates = [];
    const values = [];

    if (fields.username) {
        updates.push('username = ?');
        values.push(fields.username);
    }
    if (fields.password) {
        updates.push('password = ?');
        values.push(fields.password);
    }
    if (fields.user_type) {
        updates.push('user_type = ?');
        values.push(fields.user_type);
    }
    if (fields.organization_id) {
        updates.push('organization_id = ?');
        values.push(fields.organization_id);
    }
    if (updates.length === 0) {
        throw new Error('No fields to update');
    }

    const query = `UPDATE USERS SET ${updates.join(', ')} WHERE id = ?`;
    values.push(userId);

    const [result] = await db.query(query, values);
    return result;
}

module.exports = {
    createUser,
    updateUser
}