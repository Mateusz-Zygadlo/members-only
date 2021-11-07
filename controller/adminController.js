const User = require('../model/user');

exports.loginAdmin = [
  (req, res, next) => {
    User.findOne({email: req.body.email})
  }
]