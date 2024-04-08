const { upload } = require("../../config/multerConfig");
const { Admin } = require("../models/admin.model");
const { Category } = require("../models/category.model");
const jwt = require('jsonwebtoken');
const Menu = require("../models/menu.model");

const getMenuPage=async(req,res)=>{
    try {
        const menus = await Menu.findAll({
            include:[
                {
                    model:Category,
                    as:'menuCategory'
                }
            ]
        });

        const adminToken = req.cookies.adminJwt;


        if(adminToken){
            const decoded = jwt.verify(adminToken,process.env.admin_secret_key);
            const adminId = decoded.adminId;
            const admin = await Admin.findOne({where:{id:adminId}})
            return res.render('admin/menu',{menus,admin});
        }
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
}

const addMenu=async(req,res)=>{
    try {
        upload.fields([{name:'image',maxCount:1}])(req,res,async function(err){
             if(err){
                return res.status(400).json({message:'file upload failed'});
             }
             const { name, price, category,description,menutype } = req.body;
             const image = req.files['image'] ? req.files['image'][0].path : null;

             const newMenu = await Menu.create({
                name, price, category,menutype,description,image
             });

             return res.redirect('/admin/menu')
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add the product' });
    }
}


const getSingleMenu=async(req,res)=>{
    try {
        const menu = await Menu.findOne({
            where:{
                id:req.params.id
            }
        });

        if(menu){
           const imageUrl = menu.image;
           menu.imageUrl = imageUrl;

           return res.json(menu);
        }
        else{
            return res.status(404).json({ error: 'menu not found' });
        }
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Failed to fetch menu' });
    }
}

const getMenuUpdateForm=async(req,res)=>{
    const {id} = req.params;
    try {
       const menu = await Menu.findByPk(id);

       if(menu){
          res.json({success:true,data:menu})
       }
       else{
        res.json({success:false,message:"menu not found"});
       }

    } catch (error) {
        console.error('Error retrieving menu', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve menu' });
    }
}

const updateMenu = async (req, res) => {
    try {
        upload.fields([{ name: 'image', maxCount: 1 }])(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'File upload failed.' });
            }

            const menuId = req.params.id;
            const { name, price,menutype,category,description } = req.body;
            const image = req.files['image'] ? req.files['image'][0].path : null;
          
            const menu = await Menu.findByPk(menuId);

            if (!menu) {
                return res.status(404).json({ message: 'menu not found' });
            }

            menu.name = name;
            menu.price = price;
            menu.menutype = menutype;
            menu.category = category;
            menu.description = description;

            if (image) {
                menu.image = image;
            }

            await menu.save();

            return res.redirect('/admin/menu');
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update menu' });
    }
};

const deleteMenu=async(req,res)=>{
  try {
      const menuId = req.params.id;

      const menu = await Menu.findByPk(menuId);

      if(!menu){
        return res.status(404).json({ success: false, message: 'menu not found'});
      }

      await menu.destroy();

      return res.redirect("/admin/menu")
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
}

module.exports = {
    getMenuPage,
    addMenu,
    getSingleMenu,
    getMenuUpdateForm,
    updateMenu,
    deleteMenu
}