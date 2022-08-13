const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true },
  comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] },
});

module.exports = mongoose.model('Post', PostSchema);
