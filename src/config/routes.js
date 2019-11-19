const express = require('express');

const seedRoute = require('../routes/seed');
const organizationRoute = require('../routes/organization');
const error = require('../middlewares/error');

module.exports = function(app) {
  app.use(express.json());

  app.use('/seed', seedRoute);
  app.use('/orgs/', organizationRoute);

  app.use(error);
};
