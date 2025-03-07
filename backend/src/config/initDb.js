const pool = require('./db');

const initDb = async () => {
    try {

        // Create ORGANIZATIONS table
        await pool.query(`
            CREATE TABLE ORGANIZATIONS (
               id INT AUTO_INCREMENT PRIMARY KEY,
               name VARCHAR(200) NOT NULL UNIQUE,
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        // Create USERS table
        await pool.query(`
            CREATE TABLE USERS (
                 id INT AUTO_INCREMENT PRIMARY KEY,
                 username VARCHAR(255) NOT NULL UNIQUE,
                 password VARCHAR(255) NOT NULL,
                organization_id INT NOT NULL,
                user_type ENUM('admin', 'user') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (organization_id) REFERENCES ORGANIZATIONS(id),
                INDEX (organization_id)
                )
        `);

        // Create URLS table
        await pool.query(`
            CREATE TABLE URLS (
            id INT AUTO_INCREMENT PRIMARY KEY,
            shortUrl VARCHAR(255) NOT NULL,
            longUrl TEXT NOT NULL,
            user_id INT NOT NULL,
            organization_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expiresAt TIMESTAMP,
            clicks INT DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES USERS(id),
            FOREIGN KEY (organization_id) REFERENCES ORGANIZATIONS(id),
            INDEX(shortUrl),
            INDEX(user_id),
            INDEX(organization_id)    )
        `);
        // Create SESSIONS table
        await pool.query(`
            CREATE TABLE SESSIONS (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              session_token VARCHAR(255) NOT NULL UNIQUE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              expires_at TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES USERS(id),
              INDEX (session_token))
        `);

        // Create trigger for URLS table
        await pool.query(`
            CREATE TRIGGER before_insert_urls
            BEFORE INSERT ON URLS
            FOR EACH ROW
            SET NEW.expiresAt = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 WEEK)
        `);

        // Create trigger for SESSIONS table
        await pool.query(`
            CREATE TRIGGER before_insert_sessions
            BEFORE INSERT ON SESSIONS
            FOR EACH ROW
            SET NEW.expires_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 60 MINUTE)
        `);
        console.log('Database tables created successfully');
    } catch (error) {
        console.error('Error creating database tables:', error);
    }
};

initDb();