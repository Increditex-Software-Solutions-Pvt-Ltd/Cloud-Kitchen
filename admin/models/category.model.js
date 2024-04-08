const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');

const Category = sequelize.define("category",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
})


module.exports = {Category}