const express = require('express');

const isMember = require('../middlewares/isMember');
const controller = require('../controllers/organization');

const router = express.Router();

router.get('/:orgName/members', controller.getMembers);
router.post('/:orgName/comments', isMember, controller.postComment);
router.get('/:orgName/comments', controller.allComments);
router.delete('/:orgName/comments/:commentId', controller.deleteComment);

module.exports = router;
