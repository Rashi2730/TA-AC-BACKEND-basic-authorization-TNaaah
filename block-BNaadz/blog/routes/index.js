var express = require('express');
var router = express.Router();
var Article = require('../model/Article');

var auth = require('../middlewares/auth');

/* HOME PAGE. */
router.get('/', function (req, res, next) {
  var flash = {
    success: req.flash('success')[0],
    error: req.flash('error')[0],
  };
  Article.find({})
    .populate('author')
    .exec((err, allArticles) => {
      console.log(err, allArticles);
      if (err) return next(err);
      res.render('index', { flash, allArticles });
    });
});

module.exports = router;
