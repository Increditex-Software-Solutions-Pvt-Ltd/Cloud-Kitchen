const express = require("express");
const { getEnquiryPage, addEnquiry, deleteEnquiry } = require("../controllers/enquiry.controller");
const enquiryRouter = express.Router();

enquiryRouter.get('/enquiry',getEnquiryPage);
enquiryRouter.post('/addenquiry',addEnquiry);
enquiryRouter.post('/enquiry-delete/:id',deleteEnquiry);

module.exports = enquiryRouter;