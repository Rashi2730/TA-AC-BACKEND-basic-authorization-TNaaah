var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  articleId: {
    type: String,
    ref: 'Article',
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  slug: {
    type: String,
  },

  likes: {
    type: Number,
    default: 0,
  },

  isLiked: {
    type: Boolean,
    default: false,
  },
});

commentSchema.pre('save', function (next) {
  if (this.content || this.isModified('content')) {
    this.slug = this.content.toLowerCase().split(' ').join('-');
    next();
  } else {
    next();
  }
});

module.exports = mongoose.model('Comment', commentSchema);
