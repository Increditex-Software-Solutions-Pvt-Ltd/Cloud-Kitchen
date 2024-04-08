const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');


const About = sequelize.define("about",{
    aboutCompany:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    founderImage:{
        type:DataTypes.STRING,
        allowNull:true
    },
    aboutFounder:{
       type:DataTypes.TEXT,
       allowNull:true
    }
})


module.exports = {About}