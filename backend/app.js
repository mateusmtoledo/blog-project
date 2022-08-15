require('dotenv').config();
const express = require('express');
const path = require('path');
require('./services/passport');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.ORIGIN,
}));

const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const passport = require('passport');

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const postsRouter = require('./routes/posts');

app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('Blog Project');
});

app.use((req, res, next) => {
  next({
    status: 404,
    msg: '404 Not Found',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json(err);
});

app.listen('3001', () => {
  console.log('Listening on port 3001');
});

module.exports = app;
