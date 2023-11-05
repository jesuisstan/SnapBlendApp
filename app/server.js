const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/usersRoute.js');
const authRoutes = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      throw err;
    });
};

// Configure CORS middleware
app.use(
  cors({
    origin: `${process.env.HOST}:${process.env.FRONTEND_PORT}`,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  })
);

//middlewares
app.use(cookieParser());

app.use('/api/check', (req, res) => {
  res.send('Hello from InfoMapApp server');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.use(
  '/static',
  express.static(path.resolve(__dirname, 'frontend', 'static'))
);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.FRONTEND_PORT || 4444, () => {
  console.log('Server running...');
  connect();
});
