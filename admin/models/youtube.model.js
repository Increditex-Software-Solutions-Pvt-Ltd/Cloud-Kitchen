const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');


const Youtube = sequelize.define("youtube",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    youtubeThumbnail:{
        type:DataTypes.STRING,
        allowNull:true
    },
    youtubeLink:{
        type:DataTypes.STRING,
        allowNull:true
    }
   
})


module.exports = Youtube;