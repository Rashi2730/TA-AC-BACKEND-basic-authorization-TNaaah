var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: { type: String, required: true },

  description: { type: String },

  likes: { type: Number, default: 0 },

  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment',
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  slug: { type: String },
  isLiked: {
    type: Boolean,
    default: false,
  },
});

articleSchema.pre('save', function (next) {
  if (this.title || this.isModified('title')) {
    this.slug = this.title.toLowerCase().split(' ').join('-');
    next();
  } else {
    next();
  }
});

articleSchema.methods.toggleLike = function () {
  this.isLiked = !this.isLiked;
  this.likes++;
  return;
};

module.exports = mongoose.model('Article', articleSchema);
