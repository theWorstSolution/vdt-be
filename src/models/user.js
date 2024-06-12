const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: String,
  role: {
    type: String,
    enum: ['user','admin'],
    default: "user",
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
