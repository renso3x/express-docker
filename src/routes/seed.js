const express = require('express');

const controller = require('../controllers/seed');

const router = express.Router();

router.get('/', controller.seed);

module.exports = router;
