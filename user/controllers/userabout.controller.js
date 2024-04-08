const { About } = require("../../admin/models/about.model");

const getAboutPage = async (req, res) => {
    try {
          const about = await About.findAll();

          const aboutcompany = about.length > 0 ? about[0].aboutCompany : "this is company about";
          const aboutimage = about.length > 0 ? about[0].founderImage : "";
          const aboutfounder = about.length > 0 ? about[0].aboutFounder : "this is company founder";
          return res.render('user/about',{aboutcompany,aboutimage,aboutfounder});
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {getAboutPage}