const express = require('express');
const { getHomePage } = require('../controllers/userhome.controller');
const userhomeRouter = express.Router();

userhomeRouter.get('/',getHomePage);

module.exports = {userhomeRouter}
