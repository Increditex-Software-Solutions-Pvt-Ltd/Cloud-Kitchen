const Homepage = require("../../admin/models/homecms.model");
const { Dish } = require("../../admin/models/topdish.model");
const Youtube = require("../../admin/models/youtube.model");


const getHomePage = async (req, res) => {
    try {
        const home = await Homepage.findAll();
        const topdishes = await Dish.findAll();
        const youtuberecords = await Youtube.findAll();

        const popularDishes = home.length > 0 ? JSON.parse(home[0].populardish) : [];

        const heading = home.length > 0 ? home[0].mainHeading : "Welcome to mommy's kitchen";
        const serviceheading = home.length > 0 ? home[0].serviceHeading : "";
        const servicedesc = home.length > 0 ? home[0].serviceDescription : "";
        const serviceshortinfo = home.length > 0 ? home[0].serviceShortInfo : "";
        const youtubelink = youtuberecords.length > 0 ? youtuberecords[0].youtubeLink:""
        const youtubethumbnail = youtuberecords.length > 0 ?youtuberecords[0].youtubeThumbnail:""
        
        return res.render('user/index', { heading,popularDishes,serviceheading,servicedesc,serviceshortinfo,topdishes,youtubelink,youtubethumbnail });
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {getHomePage}