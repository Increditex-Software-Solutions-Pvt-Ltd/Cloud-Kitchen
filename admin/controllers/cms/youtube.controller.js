const { youtubeStorage } = require("../../../config/multerConfig");
const Youtube = require("../../models/youtube.model");


const addYoutubeContent=async(req,res)=>{
    try {
    youtubeStorage.single('youtubeThumbnail')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'youtube thumbnail upload failed' });
            }

        
            const { youtubeLink } = req.body;
            const youtubeThumbnail = req.file ? req.file.path : null;

            const newYouTube = await Youtube.create({
                youtubeLink,
                youtubeThumbnail
            });

            return res.redirect('/admin/cms'); 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add YouTube video' });
    }
}

const getYoutubeUpdateForm=async(req,res)=>{
    const {id} = req.params;
    try {
       const youtubeRecord = await Youtube.findByPk(id);

       if(youtubeRecord){
          res.json({success:true,data:youtubeRecord})
       }
       else{
        res.json({success:false,message:"youtube record not found"});
       }

    } catch (error) {
        console.error('Error retrieving record', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve record' });
    }
}

const updateYouTubeRecord = async (req, res) => {
    try {
        const youtubeId = req.params.id;

        // Assuming you have a function like `findById` to find the YouTube video by ID
        const existingYouTube = await Youtube.findByPk(youtubeId);

        if (!existingYouTube) {
            return res.status(404).json({ message: 'YouTube video not found' });
        }

        youtubeStorage.single('youtubeThumbnail')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'file upload failed' });
            }

            const { youtubeLink } = req.body;

            // Check if a new thumbnail file is uploaded
            if (req.file) {
                existingYouTube.youtubeThumbnail = req.file.path;
            }

            existingYouTube.youtubeLink = youtubeLink;

            await existingYouTube.save();

            return res.redirect('/admin/cms'); // Redirect to appropriate page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update YouTube video' });
    }
};

module.exports ={addYoutubeContent,getYoutubeUpdateForm,updateYouTubeRecord}