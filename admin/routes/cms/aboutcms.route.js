const express = require('express');
const { addAboutContent, getAboutUpdateForm, updateAboutRecord } = require('../../controllers/cms/aboutcms.controller');
const aboutcmsRouter = express.Router();

aboutcmsRouter.post('/addabout',addAboutContent);
aboutcmsRouter.get('/aboutrecord/:id',getAboutUpdateForm);
aboutcmsRouter.post('/aboutrecord/:id',updateAboutRecord);

module.exports = {aboutcmsRouter}