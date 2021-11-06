const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.newUser = [
  async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.passwordOne, 10);

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
          password: hashedPassword,
          inClub: false,
        }).save(err => {
          if (err) { 
            return next(err);
          }
          res.redirect("/log-in");
        });
      }
    })
  }
];