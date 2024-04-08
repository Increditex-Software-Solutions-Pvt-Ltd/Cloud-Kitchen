const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');


const Homepage = sequelize.define("homepage",{
   
    mainHeading: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    serviceHeading: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    serviceDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    serviceShortInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    populardish:{
        type: DataTypes.JSON,
        allowNull: true,
    }
})


module.exports = Homepage;