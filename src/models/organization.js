const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String
});

const Organization = mongoose.model('Organization', schema);

module.exports = Organization;
