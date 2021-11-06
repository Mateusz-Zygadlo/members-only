const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: 'string',
    require: true
  },
  description: {
    type: 'string',
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: 'Date',
    require: true,
  }
})

module.exports = PostSchema;
module.exports = mongoose.model('Posts', PostSchema);