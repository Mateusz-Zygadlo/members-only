const Post = require('../model/post');

exports.createPost = [
  (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.user._id,
      date: new Date()
    }).save((err) => {
      if(err){
        return next(err)
      }
      res.redirect('/');
    })
  }
]