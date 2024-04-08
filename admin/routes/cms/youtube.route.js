const express = require('express');
const { addYoutubeContent, getYoutubeUpdateForm, updateYouTubeRecord } = require('../../controllers/cms/youtube.controller');
const youtubeRouter = express.Router();

youtubeRouter.post('/addyoutube',addYoutubeContent);
youtubeRouter.get('/youtuberecord/:id',getYoutubeUpdateForm);
youtubeRouter.post('/youtuberecord/:id',updateYouTubeRecord);

module.exports = {youtubeRouter}