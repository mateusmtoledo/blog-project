require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Blog Project');
});

app.use((req, res, next) => {
  next('404 Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(404).send(err);
});

app.listen('3000', () => {
  console.log('Listening on port 3000');
});

module.exports = app;
