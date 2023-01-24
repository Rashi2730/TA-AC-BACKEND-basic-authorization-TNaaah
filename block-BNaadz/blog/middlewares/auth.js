var User = require('../model/User');

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.redirect('/users/login');
      next();
    }
  },
  userInfo: function (req, res, next) {
    var userId = req.session && req.session.userId;
    if (userId) {
      User.findById(userId, 'name email', (err, user) => {
        if (err) return next(err);
        req.user = user;
        req.locals.user = user;
        next();
      });
    } else {
      req.user = {};
      req.locals.user = {};
      next();
    }
  },
};
