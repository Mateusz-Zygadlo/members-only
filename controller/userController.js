const User = require('../model/user');
const { validationResult } = require("express-validator");

exports.newUser = [
  (req, res, next) => {
    User.findOne({email: req.body.email}).exec((err, result) => {
      if(err){
        return next(err);
      }
      if(req.body.passwordOne != req.body.passwordTwo){
        res.render('sign-up_form', {err: 'Incorrect password'})

        return;
      }
      if(result){
        res.render('sign-up_form', {err: 'Incorrect email'})

        return;
      }else{
        const user = new User({
          email: req.body.email,
          password: req.body.passwordOne,
        }).save(err => {
          if (err) { 
            return next(err);
          }
          res.redirect("/");
        });
      }
    })
  }
]

exports.findUser = [
  (req, res, next) => {
    const err = validationResult(req);

    if(!err.isEmpty() || req.body.email == '' || req.body.password == ''){
      res.render('log-in_form', {err: 'incorrect password or empty input'});

      return;
    }else{
      User.find({email: req.body.email, password: req.body.password}).exec((err, result) => {
        if(err){
          return next(err);
        }
        if(result){
          console.log(result);

          res.redirect('/');
        }

        res.render('log-in_form', {err: 'incorrect password or empty input'});
      })
    }
  }
]