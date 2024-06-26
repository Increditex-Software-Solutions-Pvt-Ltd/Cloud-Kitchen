const { Admin } = require("../models/admin.model");
const jwt = require('jsonwebtoken');
const Menu = require("../models/menu.model");
const Enquiry = require("../models/enquiry.model");

const getDashboardPage=async(req,res)=>{
   try {
      const adminToken = req.cookies.adminJwt;
      const menucount = await Menu.count();
      const vegmenucount = await Menu.count({where:{
         menutype:'Veg'
      }});
      const nonvegmenucount = await Menu.count({where:{
         menutype:'Non-veg'
      }});
      const enquirycount = await Enquiry.count();

     if(adminToken){
        const decoded = jwt.verify(adminToken, process.env.admin_secret_key);
        const adminId = decoded.adminId;
        const admin = await Admin.findOne({ where: { id: adminId } });
        return res.render('admin/',{admin,menucount,vegmenucount,nonvegmenucount,enquirycount});
     }
     } catch (error) {
      console.error('Error executing Sequelize query: ', error);
      res.status(500).send('Internal Server Error');
     }
}


module.exports = {getDashboardPage}