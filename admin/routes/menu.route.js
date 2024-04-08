const express = require("express");
const { getMenuPage, addMenu, getSingleMenu, getMenuUpdateForm, updateMenu, deleteMenu } = require("../controllers/menu.controller");

const menuRouter = express.Router();

menuRouter.get('/menu',getMenuPage);
menuRouter.post('/addmenu',addMenu);
menuRouter.get('/get-single-menu/:id',getSingleMenu);
menuRouter.get('/menu/:id',getMenuUpdateForm);
menuRouter.post('/menu/:id',updateMenu);
menuRouter.post('/menu-delete/:id',deleteMenu);

module.exports = {menuRouter}