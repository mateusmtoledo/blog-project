const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
