const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
