const express = require('express');
const { getCmsPage, EditHomePage, renderEditHomePage, addHomePage, renderAddHomePage } = require('../controllers/cms.controller');
const cmsRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads/popular/')
    },
    filename:function (req, file, cb){
        cb(null, file.originalname);
    }
})


const upload = multer({storage:storage});

cmsRouter.get('/cms',getCmsPage);
cmsRouter.get('/homecms',renderAddHomePage);
cmsRouter.get('/edithome',renderEditHomePage);
cmsRouter.post('/add-home',upload.array('images',5),addHomePage)
cmsRouter.post('/edit-home/:id',upload.array('images',5),EditHomePage);

module.exports = {cmsRouter};