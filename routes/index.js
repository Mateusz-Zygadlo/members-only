const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const passport = require('passport');
const initializePassport = require('../passport.config');
const User = require('../model/user');

initializePassport(passport);

const checkAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/log-in');
}

const isLogin = (req, res, next) => {
  if(req.isAuthenticated()){
    return res.redirect('/');
  }

  next();
}

router.get('/', checkAuth, (req, res) => res.render('index', {user: req.user}));

router.get('/log-in', isLogin, (req, res) => res.render('log-in_form'));
router.post('/log-in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true
}))
router.get('/sign-up', isLogin, (req, res) => res.render('sign-up_form'));
router.post('/sign-up', userController.newUser);

router.get('/log-out', checkAuth, (req, res) => {
  req.logOut();
  res.redirect('/log-in');
})

router.get('/club', checkAuth, (req, res) => {
  res.render('club', {user: req.user});
})
router.post('/club', checkAuth, (req, res, next) => {
  User.findOneAndUpdate({email: req.user.email}, {inClub: !req.user.inClub}).exec((err, result) => {
    if(err){
      return next(err);
    }

    res.redirect('/');
  })
})

module.exports = router;