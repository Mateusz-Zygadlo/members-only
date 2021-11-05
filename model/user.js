const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: 'string',
    require: true
  },
  password: {
    type: 'string',
    require: true,
  }
})

module.exports = UserSchema;
module.exports = mongoose.model('Users', UserSchema);