var express = require('express');
var Article = require('../model/Article');
var auth = require('../middlewares/auth');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/');
});

//create new article
router.get('/new', auth.isLoggedIn, (req, res, next) => {
  res.render('articles/newArticle');
});

//post article
router.post('/new', auth.isLoggedIn, (req, res, next) => {
  req.body.author = req.user_id;
  Article.create(req.body, (err, article) => {
    console.log(err, article);
  });
});

//view articles
router.get('/:id', (req, res, next) => {
  var articleId = req.params.id;
  Article.findById(articleId)
    .populate('author')
    .exec((err, article) => {
      if (err) return next(err);
      res.render('articles/article.ejs', { article });
    });
});
