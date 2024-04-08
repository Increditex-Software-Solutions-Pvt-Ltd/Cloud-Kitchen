const express = require('express');
const { getDineinpage, getDineoutpage, getMenucardpage } = require('../controllers/dine.controller');
const userdineRouter = express.Router();

userdineRouter.get('/dinein',getDineinpage);
userdineRouter.get('/dineout',getDineoutpage);
userdineRouter.get('/menucard',getMenucardpage);

module.exports = {userdineRouter}
