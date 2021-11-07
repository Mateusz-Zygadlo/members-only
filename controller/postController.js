const Post = require('../model/post');
const User = require('../model/user');
const dayjs = require('dayjs')
dayjs().format()

exports.createPost = [
  (req, res, next) => {
    const formatedDate = dayjs(new Date()).format('YYYY-MM-DD');

    User.findById(req.user._id).exec((err, result) => {
      if(err){
        return next(err);
      }
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user._id,
        authorEmail: result.email,
        date: formatedDate,
      }).save((err) => {
        if(err){
          return next(err)
        }
        res.redirect('/');
      })
    })
  }
]

exports.allPost = (req, res, next) => {
  Post.find().exec((err, result) => {
    if(err){
      return next(err);
    }

    res.render('index', {posts: result, user: req.user})
  })
}