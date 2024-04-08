const express = require('express');
const { getAboutPage } = require('../controllers/userabout.controller');
const useraboutRouter = express.Router();

useraboutRouter.get('/about',getAboutPage);

module.exports = {useraboutRouter}
