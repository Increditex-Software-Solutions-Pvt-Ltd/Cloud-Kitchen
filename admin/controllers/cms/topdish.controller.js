const { dishstorage } = require("../../../config/multerConfig");
const { Dish } = require("../../models/topdish.model");

const addTopDish=async(req,res)=>{
    try {
       dishstorage.single('dishimage')(req, res, async function (err) {
               if (err) {
                   return res.status(400).json({ message: 'dish image upload failed' });
               }
   
           
               const { dishname,dishprice } = req.body;
               const dishimage = req.file ? req.file.path : null;
   
               const newdish = await Dish.create({
                   dishname,dishprice,dishimage
               });
   
               return res.redirect('/admin/cms'); 
           });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Failed to add Top dish' });
       }
 }
 
 const getTopdishUpdateForm=async(req,res)=>{
    const {id} = req.params;
    try {
       const dishRecord = await Dish.findByPk(id);
 
       if(dishRecord){
          res.json({success:true,data:dishRecord})
       }
       else{
        res.json({success:false,message:"top dish record not found"});
       }
 
    } catch (error) {
        console.error('Error retrieving record', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve record' });
    }
 }
 
 const updateTopdishRecord = async (req, res) => {
    try {
        const dishId = req.params.id;
 
        // Assuming you have a function like `findById` to find the YouTube video by ID
        const existingdish = await Dish.findByPk(dishId);
 
        if (!existingdish) {
            return res.status(404).json({ message: 'founder image not found' });
        }
 
        dishstorage.single('dishimage')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'dish image upload failed' });
            }
 
            const { dishname,dishprice} = req.body;
 
          
            if (req.file) {
                existingdish.dishimage = req.file.path;
            }
 
            existingdish.dishname = dishname;
            existingdish.dishprice = dishprice;
 
            await existingdish.save();
 
            return res.redirect('/admin/cms');
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update YouTube video' });
    }
 };

 const deleteTopdish=async(req,res)=>{
    try {
        const dishId = req.params.id;
  
        const topdish = await Dish.findByPk(dishId);
  
        if(!topdish){
          return res.status(404).json({ success: false, message: 'topdish not found'});
        }
  
        await topdish.destroy();
  
        return res.redirect("/admin/cms")
    } catch (error) {
      console.error('Error deleting topdish:', error);
      res.status(500).json({ success: false, message: 'Failed to delete topdish' });
    }
  }
  
 module.exports = {addTopDish,getTopdishUpdateForm,updateTopdishRecord,deleteTopdish}