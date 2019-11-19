const OrganizationService = require('../services/organization');

module.exports = async (req, res, next) => {
  try {
    const orgName = req.params;

    const { memberId, comment } = req.body;

    const { members } = await OrganizationService.getMembers(orgName);

    const member = members.filter(member => member._id == memberId)[0];

    if (!member) {
      throw new Error('Forbidden, not a member of this organization');
    }

    req.comment = {
      comment,
      member: member._id,
      organization: member.organization._id
    };

    next();
  } catch (e) {
    res.status(402).send({ message: e.message });
  }
};
