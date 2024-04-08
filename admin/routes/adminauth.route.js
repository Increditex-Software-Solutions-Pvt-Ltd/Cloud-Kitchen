const express = require("express");
const { getAdminRegisterpage, getLoginPage, handleRegisterAdmin, handleAdminLogin, postLogoutAdmin } = require("../controllers/adminauth.controller");
const adminauthRouter = express.Router();

adminauthRouter.get('/register',getAdminRegisterpage);
adminauthRouter.get('/login',getLoginPage);
adminauthRouter.post('/register-admin',handleRegisterAdmin);
adminauthRouter.post('/login-admin',handleAdminLogin);
adminauthRouter.get('/logout-admin',postLogoutAdmin);

module.exports = {adminauthRouter};