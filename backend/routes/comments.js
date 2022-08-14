const express = require('express');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router.post('/', [
  passport.authenticate('jwt', { session: false }),
  body('text', 'Text field is required').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        errors,
      });
      return;
    }
    const { postId } = req.params;
    Post.findById(postId, (err, post) => {
      if (err) {
        next(err);
        return;
      }
      if (!post) {
        next({
          status: 400,
        });
      }
      new Comment({
        text: req.body.text,
        post: post._id,
        author: req.user._id,
      }).save((err, comment) => {
        if (err) {
          next(err);
          return;
        }
        res.json(comment);
      });
    });
  },
]);

router.delete('/:commentId', [
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { postId, commentId } = req.params;
    Post.findById(postId, (err, post) => {
      if (err) {
        next(err);
        return;
      }
      if (!(req.user._id === post.author || req.user.admin)) {
        res.status(401).send('Unauthorized');
        return;
      }
      Comment.findByIdAndDelete(commentId, (err, comment) => {
        if (err) {
          next(err);
          return;
        }
        if (!comment) {
          next({
            status: 404,
            msg: '404 Not Found',
          });
        }
        res.json(comment);
      });
    });
  },
]);

module.exports = router;
