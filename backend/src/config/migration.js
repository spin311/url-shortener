const db = require('../config/db');

const migrateDb = async () => {
    try {
        // Insert organizations
        await db.query(`INSERT INTO ORGANIZATIONS (name) VALUES
                                                             ('Organization 1'),
                                                             ('Organization 2'),
                                                             ('Organization 3'),
                                                             ('Organization 4'),
                                                             ('Organization 5')`);

        // Insert users
        await db.query(`INSERT INTO USERS (username, password, organization_id, user_type) VALUES 
            ('user1', 'password1', 1, 'user'), 
            ('user2', 'password2', 2, 'user'), 
            ('user3', 'password3', 3, 'user'), 
            ('user4', 'password4', 4, 'user'), 
            ('user5', 'password5', 5, 'admin')`);

        // Insert URLs
        await db.query(`INSERT INTO URLS (shortUrl, longUrl, user_id, organization_id) VALUES 
            ('short1', 'http://example.com/1', 1, 1), 
            ('short2', 'http://example.com/2', 2, 2), 
            ('short3', 'http://example.com/3', 3, 3), 
            ('short4', 'http://example.com/4', 4, 4), 
            ('short5', 'http://example.com/5', 5, 5)`);        console.log('Database rows migrated successfully');
    } catch (error) {
        console.error('Error migrating database:', error);
    }
}
migrateDb();