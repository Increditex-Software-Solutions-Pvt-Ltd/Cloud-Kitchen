require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const configViewEngine = require('./viewEngine');
const { menuRouter } = require('./admin/routes/menu.route');
const { dashboardRouter } = require('./admin/routes/dashboard.route');
const { categoryRouter } = require('./admin/routes/category.route');
const { adminauthRouter } = require('./admin/routes/adminauth.route');
// const { cmsRouter } = require('./admin/routes/cms.route');
const { homecmsRouter } = require('./admin/routes/cms/homecms.route');
const { youtubeRouter } = require('./admin/routes/cms/youtube.route');
const { aboutcmsRouter } = require('./admin/routes/cms/aboutcms.route');
const { topdishRouter } = require('./admin/routes/cms/topdish.route');
const { userhomeRouter } = require('./user/routes/userhome.route');
const { useraboutRouter } = require('./user/routes/userabout.route');
const { userdineRouter } = require('./user/routes/dine.route');
const { uservegmenuRouter } = require('./user/routes/vegmenu.route');
const enquiryRouter = require('./admin/routes/enquiry.route');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
configViewEngine(app);

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// admin routes
app.use('/admin',menuRouter);
app.use('/admin',categoryRouter);
app.use('/admin',dashboardRouter);
app.use('/admin',adminauthRouter); 
app.use('/admin',homecmsRouter);
app.use('/admin',youtubeRouter);
app.use('/admin',aboutcmsRouter);
app.use('/admin',topdishRouter);
app.use('/admin',enquiryRouter);


// user routes
app.use('/',userhomeRouter);
app.use('/',useraboutRouter);
app.use('/',userdineRouter);
app.use('/',uservegmenuRouter);

app.listen(port,()=>{
    console.log(`app running on http://localhost:${port}`);
})
