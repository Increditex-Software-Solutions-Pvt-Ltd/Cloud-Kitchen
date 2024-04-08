const { extraDishUpload,youtubeStorage } = require("../../../config/multerConfig");
const { About } = require("../../models/about.model");
const Homepage = require("../../models/homecms.model");
const { Dish } = require("../../models/topdish.model");
const Youtube = require("../../models/youtube.model");


const gethomeCmspage = async (req, res) => {
    try {
        const homeRecords = await Homepage.findAll();
        const youtubeRecords = await Youtube.findAll();
        const aboutRecords = await About.findAll();
        const topdishRecords = await Dish.findAll();

        const hasYoutubeRecords = youtubeRecords.length > 0;
        const hasRecords = homeRecords.length > 0;
        const hasAboutRecords = aboutRecords.length > 0;
        return res.render('admin/cms',{homeRecords,youtubeRecords,hasRecords,hasYoutubeRecords,aboutRecords,hasAboutRecords,topdishRecords});
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
}

const addHomeContent = async (req, res) => {
    try {
        extraDishUpload.array('images', 5)(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'file upload failed' });
            }

            const formData = req.body;
            const files = req.files;

            try {
                const homepageData = {
                    mainHeading: formData.mainHeading,
                    serviceHeading: formData.serviceheading,
                    serviceDescription: formData.servicedesc,
                    serviceShortInfo: formData.serviceshort,
                    populardish: files && files.length > 0 ? files.map(file => file.path) : null,
                };

                const homepageRecord = await Homepage.create(homepageData);

                    // Redirect after successfully creating the record
                    res.redirect('/admin/cms');
            } catch (error) {
                console.error('Error adding homepage:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    } catch (error) {
        console.error('Error adding homepage:', error);
        res.status(500).send('Internal Server Error');
    }
};


const getSingleHomeRecord = async (req, res) => {
    try {
        const dish = await Homepage.findOne({
            where: {
                id: req.params.id
            }
        });


        if (dish) {
            const imageUrls = dish.populardish || [];

            return res.json(dish);
        } else {
            return res.status(404).json({ error: 'Dish not found' });
        }
    } catch (error) {
        console.error('Error fetching dish:', error);
        res.status(500).json({ error: 'Failed to fetch dish' });
    }
};


const getHomeUpdateForm=async(req,res)=>{

    const {id} = req.params;
   try {
       const homeContent = await Homepage.findByPk(id);
       
       if(homeContent){
         res.json({success:true,data:homeContent})
       }
       else{
        res.json({success:false,message:"homerecord not found"});
       }
   } catch (error) {
    console.error('Error updating homecontent', error);
    res.status(500).json({ success: false, message: 'Failed to update homecontent' });
   }
}

const updateHomeContent=async(req,res)=>{
   try {
    const { id } = req.params;
        
   
    const existingHomeRecord = await Homepage.findByPk(id);

    if (!existingHomeRecord) {
        return res.status(404).json({ message: 'Home record not found' });
    }

    extraDishUpload.array('images', 5)(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'file upload failed' });
        }

        const formData = req.body;
        const files = req.files;

    
        existingHomeRecord.mainHeading = formData.mainHeading;
        existingHomeRecord.serviceHeading = formData.serviceheading;
        existingHomeRecord.serviceDescription = formData.servicedesc;
        existingHomeRecord.serviceShortInfo = formData.serviceshort;

       
        if (files && files.length > 0) {
            existingHomeRecord.populardish = files.map(file => file.path);
        }

        // Save the updated record
        await existingHomeRecord.save();

       
        res.redirect('/admin/cms');
    });
   } catch (error) {
    console.error('Error retrieving homecontent', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve homecontent' });
   }
}
module.exports = { gethomeCmspage,addHomeContent,getSingleHomeRecord,getHomeUpdateForm,updateHomeContent }