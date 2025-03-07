# URL Shortener Backend

A backend application for shortening URLs with user authentication and role-based access control.

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: MySQL (or PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Short URL Generation**: nanoid
- **Environment Variables**: dotenv
- **Logging**: Custom logger (optional)
- **Testing**: Bruno (or Postman)

---

## **Database Tables**

### **1. `USERS` Table**
Stores user information.
```sql
CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('admin', 'user') DEFAULT 'user'
);

### **2. SESSIONS Table
CREATE TABLE SESSIONS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

### **3. URLS Table
Stores shortened URLs.

CREATE TABLE URLS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    longUrl TEXT NOT NULL,
    shortUrl VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

## **Project structure**
backend/
├── src/
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Custom middleware (e.g., authentication)
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (e.g., base URL generator)
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── .env                    # Environment variables
├── .gitignore              # Files to ignore in Git
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation

## **Endpoint structure**

Authentication

    POST /auth/login: Log in a user.

        Request Body: { "username": "admin", "password": "admin" }

        Response: { "token": "jwt-token" }

    POST /auth/register: Register a new user (admin-only).

        Request Body: { "username": "new_user", "password": "password" }

        Response: { "id": 1, "username": "new_user", "user_type": "user" }

URLs

    POST /urls: Create a shortened URL.

        Request Body: { "longUrl": "https://example.com" }

        Response: { "id": 1, "longUrl": "https://example.com", "shortUrl": "https://short.url/abc123" }

    GET /urls: Get all URLs for the logged-in user.

        Response: [{ "id": 1, "longUrl": "https://example.com", "shortUrl": "https://short.url/abc123" }]

    DELETE /urls/:id: Delete a URL (user can delete their own URLs; admin can delete any URL).

        Response: { "message": "URL deleted successfully" }

Users

    GET /users: Get all users (admin-only).

        Response: [{ "id": 1, "username": "admin", "user_type": "admin" }]

    DELETE /users/:id: Delete a user (admin-only).

        Response: { "message": "User deleted successfully" }

How to Run the Project

    Clone the repository:
    bash
    Copy

    git clone https://github.com/your-username/url-shortener-backend.git
    cd url-shortener-backend

    Install dependencies:
    bash
    Copy

    npm install

    Set up the database:

        Create the USERS, SESSIONS, and URLS tables using the SQL scripts above.

    Create a .env file:
    env
    Copy

    JWT_SECRET_KEY=your-secret-key
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your-password
    DB_NAME=url_shortener

    Start the server:
    bash
    Copy

    npm start

    Test the API using Bruno or Postman.

License

This project is licensed under the MIT License. See the LICENSE file for details.
Copy


---

### **How to Use**
1. Copy the entire content above.
2. Paste it into a new file named `README.md` in your project's root directory.
3. Customize the content (e.g., replace `your-username` with your GitHub username).

This `README.md` is ready to use and provides a clear, structured overview of your project. Let me know if you need further adjustments!