var express = require('express');
var router = express.Router();
var User = require('../model/User');

// REGISTER PAGE
router.get('/new', function (req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  res.render('/users/signup');
});

// create a user
router.post('/new', function (req, res, next) {
  var body = req.body;
  User.create(body, (err, user) => {
    if (err) return next(err);
    req.flash('success', 'User created Successfully');
    res.redirect('/users/login');
  });
});

//login page
router.get('/login', function (req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect('/');
  }

  var flash = {
    success: req.flash('success')[0],
    error: req.flash('error')[0],
  };
  res.render('/users/login', { flash });
});

// user logging in
router.post('/login', function (req, res, next) {
  var { email, password } = req.body;

  //empty input
  if (!email || !password) {
    req.flash('error', 'Email and password required');
    return res.redirect('/users/login');
  }

  //find the user
  User.findOne({ email }, (err, user) => {
    if (err) next(err);

    //no user found
    if (!user) {
      req.flash('error', 'No user found! Please register');
      return res.redirect('/users/new');
    }

    //confirm password
    user.compare(password, (err, result) => {
      if (err) return next(err);

      if (!result) {
        req.flash('error', 'Incorrect Password');
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      req.flash('success', 'Welcome' + user.name);
      return res.redirect('/');
    });
  });
});

//logout page
router.get('/logout', function (req, res, next) {
  req.flash('success', 'User logged out successfully');
  res.clearCookie('connect.sid');
  req.session.destroy();
  res.redirect('/users/login');
});
module.exports = router;
