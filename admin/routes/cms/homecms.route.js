const express = require('express');
const homecmsRouter = express.Router();
const { gethomeCmspage, addHomeContent, getSingleHomeRecord, getHomeUpdateForm, updateHomeContent } = require('../../controllers/cms/homecms.controller');


homecmsRouter.get('/cms',gethomeCmspage);
homecmsRouter.post('/addhomecms',addHomeContent);
homecmsRouter.get('/get-single-homerecord/:id',getSingleHomeRecord);
homecmsRouter.get('/home-content/:id',getHomeUpdateForm);
homecmsRouter.post('/home-content/:id',updateHomeContent);

module.exports = {homecmsRouter};