const db = require('../config/db');

const dropDB = async () => {
    try {
        await db.query(`DROP TABLE IF EXISTS SESSIONS`);
        await db.query(`DROP TABLE IF EXISTS URLS`);
        await db.query(`DROP TABLE IF EXISTS USERS`);
        await db.query(`DROP TABLE IF EXISTS ORGANIZATIONS`);
        console.log('Database tables dropped successfully');
    } catch (error) {
        console.error('Error dropping database tables:', error);
    }
}
dropDB();