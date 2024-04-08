const { founderStorage } = require("../../../config/multerConfig");
const { About } = require("../../models/about.model");

const addAboutContent=async(req,res)=>{
   try {
      founderStorage.single('founderImage')(req, res, async function (err) {
              if (err) {
                  return res.status(400).json({ message: 'founder image upload failed' });
              }
  
          
              const { aboutCompany,aboutFounder } = req.body;
              const founderImage = req.file ? req.file.path : null;
  
              const newabout = await About.create({
                  aboutCompany,aboutFounder,
                  founderImage
              });
  
              return res.redirect('/admin/cms'); 
          });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to add YouTube video' });
      }
}


const getAboutUpdateForm=async(req,res)=>{
   const {id} = req.params;
   try {
      const aboutRecord = await About.findByPk(id);

      if(aboutRecord){
         res.json({success:true,data:aboutRecord})
      }
      else{
       res.json({success:false,message:"about record not found"});
      }

   } catch (error) {
       console.error('Error retrieving record', error);
       res.status(500).json({ success: false, message: 'Failed to retrieve record' });
   }
}

const updateAboutRecord = async (req, res) => {
   try {
       const aboutId = req.params.id;

       // Assuming you have a function like `findById` to find the YouTube video by ID
       const existingabout = await About.findByPk(aboutId);

       if (!existingabout) {
           return res.status(404).json({ message: 'founder image not found' });
       }

       founderStorage.single('founderImage')(req, res, async function (err) {
           if (err) {
               return res.status(400).json({ message: 'file upload failed' });
           }

           const { aboutCompany,aboutFounder} = req.body;

         
           if (req.file) {
               existingabout.founderImage = req.file.path;
           }

           existingabout.aboutCompany = aboutCompany;
           existingabout.aboutFounder = aboutFounder;

           await existingabout.save();

           return res.redirect('/admin/cms');
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Failed to update YouTube video' });
   }
};

module.exports = {addAboutContent,getAboutUpdateForm,updateAboutRecord}