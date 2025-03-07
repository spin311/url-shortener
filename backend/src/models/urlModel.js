const db = require('../config/db');

async function createUrl(shortUrl, longUrl, user) {
    const query = `INSERT INTO URLS (shortUrl, longUrl, user_id, organization_id) VALUES (?, ?, ?, ?)`;
    const [rows] = await db.query(query, [shortUrl, longUrl, user.id, user.organization_id]);
    return rows;
}

async function deleteUrl(urlId) {
    const query = `DELETE FROM URLS WHERE id = ?`;
    const [rows] = await db.query(query, [urlId]);
    return rows;
}

async function incrementClicks(urlId) {
    const query = `UPDATE URLS
                   SET clicks = clicks + 1
                   WHERE id = ?`;
    const [rows] = await db.query(query, [urlId]);
    return rows;
}

async function getUrlsforCurrentOrganization(organizationId) {
    const query = `SELECT * FROM URLS WHERE organization_id = ?`;
    const [rows] = await db.query(query, [organizationId]);
    return rows;
}

module.exports = {
    createUrl,
    deleteUrl,
    incrementClicks,
    getUrlsforCurrentOrganization
};
