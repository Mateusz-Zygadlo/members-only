const User = require('../model/user');
const { validationResult } = require("express-validator");

exports.newUser = [
  (req, res, next) => {
    const err = validationResult(req);

    const user = new User({
      email: req.body.email,
      password: req.body.passwordOne,
    })

    if(!err.isEmpty() || req.body.passwordOne != req.body.passwordTwo || req.body.email == '' || req.body.passwordOne == ''){
      res.render('sign-up_form', {err: 'incorrect password or empty input'});

      return;
    }else{
        User.findOne({email: req.body.email, password: req.body.passwordOne}).exec((err, result) => {
          if(err){
            return next(err)
          }
          if(result){
            res.render('sign-up_form', {err: 'such an account name exists'});
          }else{
            user.save((err) => {
              if(err){
                return next(err);
              }
              res.redirect('/');
          })
        }
      })
    }
  }
]