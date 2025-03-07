const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/authRouter');
const api_namespace = process.env.API_NAMESPACE;
// const userRouter = require('./routes/userRouter');
// const urlRouter = require('./routes/urlRouter');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}));

dotenv.config();
app.use(express.json());

app.use(`${api_namespace}/auth`, authRouter);
// app.use(`${apiNamespace}/users`, userRouter);
// app.use(`${apiNamespace}/urls`, urlRouter);
app.use(errorHandler);

module.exports = app;
