const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const api_namespace = process.env.API_NAMESPACE;
const urlRouter = require('./routes/urlRouter');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}));

dotenv.config();
app.use(express.json());

app.use(`${api_namespace}/auth`, authRouter);
app.use(`${api_namespace}/users`, userRouter);
app.use(`${api_namespace}/urls`, urlRouter);
app.use(errorHandler);

module.exports = app;
