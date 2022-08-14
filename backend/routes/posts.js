const express = require('express');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const Post = require('../models/Post');
const { isAdmin } = require('../middleware/auth');
const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', (req, res, next) => {
  Post.find({}, '-__v').limit(8).populate({ path: 'author', select: 'firstName lastName' }).exec((err, posts) => {
    if (err) {
      next(err);
      return;
    }
    res.json(posts);
  });
});

router.post('/', [
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  body('title', 'Title must have 3 to 64 characters').trim().isLength({ min: 3, max: 64 }).escape(),
  body('text', 'Text is required').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        errors,
      });
      return;
    }

    const { title, text } = req.body;
    new Post({
      title,
      text,
      author: req.user._id,
    }).save((err, post) => {
      if (err) {
        next(err);
        return;
      }
      res.json(post);
    });
  },
]);

router.get('/:postId', (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId, '-__v')
    .populate({ path: 'author', select: 'firstName lastName' })
    .exec((err, post) => {
      if (err) {
        next(err);
        return;
      }
      if (!post) {
        next({
          status: 404,
          msg: '404 Not Found',
        });
        return;
      }
      Comment
        .find({ post: post._id }, '-__v -post')
        .populate({
          path: 'author',
          select: 'firstName lastName',
        })
        .exec((err, comments) => {
          if (err) {
            next(err);
            return;
          }
          const postResponse = post.toJSON();
          postResponse.comments = comments;
          res.json(postResponse);
        });
    });
});

router.put('/:postId', [
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  body('title', 'Title must have 3 to 64 characters').trim().isLength({ min: 3, max: 64 }).escape(),
  body('text', 'Text is required').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        errors,
      });
      return;
    }

    const { title, text } = req.body;
    const { postId } = req.params;
    Post.findByIdAndUpdate(postId, { title, text }, (err, post) => {
      if (err) {
        next(err);
        return;
      }
      res.json(post);
    });
  },
]);

router.delete('/:postId', [
  passport.authenticate('jwt', { session: false }),
  isAdmin,

  (req, res, next) => {
    const { postId } = req.params;
    Post.findByIdAndDelete(postId, (err, post) => {
      if (err) {
        next(err);
        return;
      }
      res.json(post);
    });
  },
]);

module.exports = router;
