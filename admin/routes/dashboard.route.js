const express = require('express');
const { getDashboardPage } = require('../controllers/dashboard.controller');
const adminCheckLoggedIn = require('../middleware/auth.middleware');
const dashboardRouter = express.Router();

dashboardRouter.get('/',adminCheckLoggedIn,getDashboardPage);
dashboardRouter.get('/index',getDashboardPage);

module.exports = {dashboardRouter}