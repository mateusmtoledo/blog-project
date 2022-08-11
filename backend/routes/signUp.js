const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/', [
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

    const { username, password } = req.body;
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
          username,
          password: hashedPassword,
        }).save((err) => {
          if (err) {
            next(err);
            return;
          }
          res.json({ username });
        });
      });
    });
  },
]);

module.exports = router;
