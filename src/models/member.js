const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  followers: Number,
  following: Number,
  avatarUrl: String,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }
});

const Member = mongoose.model('Member', schema);

module.exports = Member;
