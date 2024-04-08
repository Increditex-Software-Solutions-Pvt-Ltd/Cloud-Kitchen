const { Category } = require("../models/category.model")

const addCategory=async(req,res)=>{
   try {
      await Category.create(req.body);
      return res.redirect("/admin/menu");
   } catch (error) {
    console.error('Error creating category:', error);
    res.status(200).json({ error: 'Failed to create category' });
   }
}

const getAllCategory=async(req,res)=>{
    try {
       const category = await Category.findAll();
       res.json(category);
    } catch (error) {
     console.error('Error getting category:', error);
     res.status(200).json({ error: 'Failed to get category' });
    }
 }


module.exports = {addCategory,getAllCategory}