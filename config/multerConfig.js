const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
});

const upload = multer({ storage: storage });

const extradishesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/popular/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
});

const extraDishUpload = multer({ storage: extradishesStorage });

const youtubeThumbnailStorage = multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,'uploads/youtube/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
})

const youtubeStorage = multer({ storage: youtubeThumbnailStorage });

const aboutFounderStorage = multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,'uploads/founderimage/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
})

const founderStorage = multer({ storage: aboutFounderStorage });

const topdishStorage = multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,'uploads/topdishes/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
})

const dishstorage = multer({ storage: topdishStorage });

module.exports = {upload,extraDishUpload,youtubeStorage,founderStorage,dishstorage};