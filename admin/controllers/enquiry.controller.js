const Enquiry = require("../models/enquiry.model");

const getEnquiryPage=async(req,res)=>{
  try {
       const enquiries = await Enquiry.findAll();
       return res.render('admin/enquiry',{enquiries});
  } catch (error) {
    console.error('Error executing Sequelize query: ', error);
    res.status(500).send('Internal Server Error');
  }
}


const addEnquiry = async (req, res) => {
  try {
      await Enquiry.create(req.body);
      res.status(200).json({ success: true, message: 'Enquiry submitted successfully,we will contact you soon' });
  } catch (error) {
      console.error('Error sending enquiry:', error);
      res.status(500).json({ success: false, error: 'Failed to send enquiry' });
  }
};

const deleteEnquiry = async(req,res)=>{
  try {
    const enquiryId = req.params.id;

    const enquiry = await Enquiry.findByPk(enquiryId);

    if(!enquiry){
      return res.status(404).json({ success: false, message: 'enquiry not found'});
    }

    await enquiry.destroy();

    return res.redirect("/admin/enquiry")
} catch (error) {
  console.error('Error deleting enquiry:', error);
  res.status(500).json({ success: false, message: 'Failed to delete enquiry' });
}
}


module.exports = {getEnquiryPage,addEnquiry,deleteEnquiry}