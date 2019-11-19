const OrganizationService = require('../services/organization');

module.exports.getMembers = async (req, res, next) => {
  try {
    const orgName = req.params;
    const { members } = await OrganizationService.getMembers(orgName);
    res.send(members);
  } catch (e) {
    next(e);
  }
};

module.exports.postComment = async (req, res) => {
  try {
    const newComment = await OrganizationService.addComment(req.comment);

    res.json({
      message: 'Successfully posted.',
      comment: newComment.comment
    });
  } catch (e) {
    next(e);
  }
};

module.exports.allComments = async (req, res) => {
  try {
    const orgName = req.params;

    const { comments } = await OrganizationService.getComments(orgName);

    res.send({ comments });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const response = await OrganizationService.deleteCommentById(commentId);

    res.send(response);
  } catch (e) {
    next(e);
  }
};
