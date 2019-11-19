const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  comment: String,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }
});

schema.plugin(mongoose_delete, { deletedAt: true });

const Comment = mongoose.model('Comment', schema);

module.exports = Comment;
