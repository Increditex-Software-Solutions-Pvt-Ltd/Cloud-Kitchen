const express = require('express');
const { getVegmenupage, getNonvegmenupage } = require('../controllers/vegmenu.controller');
const uservegmenuRouter = express.Router();

uservegmenuRouter.get('/vegmenu',getVegmenupage);
uservegmenuRouter.get('/nonvegmenu',getNonvegmenupage);

module.exports = {uservegmenuRouter}
