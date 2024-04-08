const express = require('express');
const { addTopDish, getTopdishUpdateForm, updateTopdishRecord, deleteTopdish } = require('../../controllers/cms/topdish.controller');
const topdishRouter = express.Router();

topdishRouter.post('/addtopdish',addTopDish);
topdishRouter.get('/dishrecord/:id',getTopdishUpdateForm);
topdishRouter.post('/dishrecord/:id',updateTopdishRecord);
topdishRouter.post('/dish-delete/:id',deleteTopdish);

module.exports = {topdishRouter}