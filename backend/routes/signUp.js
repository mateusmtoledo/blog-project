const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/', [
  body('firstName', 'First Name is required').trim().isLength({ min: 1 }).escape(),
  body('lastName', 'Last Name is required').trim().isLength({ min: 1 }).escape(),
  body('username', 'Username must have 4 to 20 characters').trim().isLength({ min: 4, max: 20 }).escape(),
  body('password', 'Password must have 6 to 20 characters').trim().isLength({ min: 6, max: 20 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        errors,
      });
      return;
    }

    const {
      firstName,
      lastName,
      username,
      password,
    } = req.body;

    User.findOne({ username }, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      if (result) {
        next({
          status: 400,
          msg: 'Username is already in use',
        });
        return;
      }
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          next(err);
          return;
        }
        new User({
          firstName,
          lastName,
          username,
          password: hashedPassword,
        }).save((err) => {
          if (err) {
            next(err);
            return;
          }
          res.json({ firstName, lastName, username });
        });
      });
    });
  },
]);

module.exports = router;
