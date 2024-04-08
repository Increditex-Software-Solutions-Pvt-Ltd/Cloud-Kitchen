const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');


const Enquiry = sequelize.define('Enquiry', {
   fullname: {
       type: DataTypes.STRING,
       allowNull: false,
   },
   email: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           isEmail: true,
       },
   },
   phone: {
       type: DataTypes.STRING, 
       allowNull: false,
   },
   message: {
       type: DataTypes.TEXT,
       allowNull: false,
   },
});



module.exports = Enquiry;