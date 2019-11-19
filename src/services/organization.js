const CommentModel = require('../models/comment');
const MembersModel = require('../models/member');
const OrganizationModel = require('../models/organization');

module.exports = {
  getMembers: async ({ orgName }) => {
    try {
      const org = await OrganizationModel.findOne({ name: orgName });

      if (!org) {
        throw new Error('Cannot find organization.');
      }

      const allMembers = await MembersModel.find(
        {
          organization: org._id
        },
        '-password'
      )
        .populate('organization')
        .sort({ followers: -1 });

      return { members: allMembers || [] };
    } catch (err) {
      throw new Error('Cannot find organization.');
    }
  },
  addComment: async ({ comment, member, organization }) => {
    try {
      const newComment = new CommentModel({
        comment,
        member,
        organization
      });

      await newComment.save();

      return { comment: newComment };
    } catch (err) {
      console.log(err);
    }
  },
  getComments: async ({ orgName }) => {
    try {
      const org = await OrganizationModel.findOne({ name: orgName });
      const allComments = await CommentModel.find({
        organization: org._id
      })
        .populate('organization')
        .where('deleted')
        .ne(true);

      return { comments: allComments || [] };
    } catch (err) {
      console.log(err);
    }
  },
  deleteCommentById: async commentId => {
    try {
      const comment = await CommentModel.findById(commentId);
      const res = await comment.delete();

      return { res };
    } catch (err) {
      console.log(err);
    }
  }
};
