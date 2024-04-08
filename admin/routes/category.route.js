const express = require('express');
const { addCategory, getAllCategory } = require('../controllers/category.contoller');

const categoryRouter = express.Router();

categoryRouter.post('/addcategory',addCategory);
categoryRouter.get('/categories',getAllCategory);

module.exports = {categoryRouter};