const Homepage = require("../models/homecms.model");

const getCmsPage=async(req,res)=>{
  try {
     const hompageRecords = await Homepage.findAll();

     const isAddButtonVisible = hompageRecords.length === 0;

     return res.render('admin/cms',{isAddButtonVisible,hompageRecords});
  } catch (error) {
    console.error('Error executing Sequelize query: ', error);
    res.status(500).send('Internal Server Error');
  }
}



const renderEditHomePage = async (req, res) => {
   try {
     const {id} = req.params;
     
     const homepageRecord = await Homepage.findByPk(id);
   console.log(homepageRecord);
   
 
     return res.render('admin/edithome',{homepageRecord});
   } catch (error) {
     console.error('Error executing Sequelize query: ', error);
     res.status(500).send('Internal Server Error');
   }
 };
 

const addHomePage=async(req,res)=>{
   try { 
      const formData = req.body;
      const files = req.files;
  
      const homepageRecord = await Homepage.create({
        mainHeading: formData.mainHeading,
        serviceHeading: formData.serviceheading,
        serviceDescription: formData.servicedesc,
        serviceShortInfo: formData.serviceshort,
        populardish: files && files.length > 0 ? files.map(file => file.path) : null,
      })
     
    
      res.redirect('/admin/cms');
   } catch (error) {
        console.error('Error adding homepage:', error);
        res.status(500).send('Internal Server Error');
   }
}

const EditHomePage=async(req,res)=>{
    try {
       const formData = req.body;
       const files = req.files;

       const homepageRecordId = req.params.id;

       const homepageRecord = await Homepage.findByPk(homepageRecordId);

       console.log(homepageRecord);
       if(!homepageRecord){
        res.status(404).send('Homepage record not found');
        return;
       }

       homepageRecord.mainHeading = formData.mainHeading;
       homepageRecord.serviceHeading = formData.serviceheading;
       homepageRecord.serviceDescription = formData.servicedesc;
       homepageRecord.serviceShortInfo = formData.serviceshort;
   
       if (files && files.length > 0) {
         homepageRecord.populardish = files.map(file => file.path);
       }
   
       await homepageRecord.save();
   
       res.redirect('/admin/cms');

    } catch (error) {
       console.error('Error updating homepage record:', error);
    res.status(500).send('Internal Server Error');
    }
}
module.exports = {getCmsPage,renderAddHomePage,addHomePage,EditHomePage,renderEditHomePage}