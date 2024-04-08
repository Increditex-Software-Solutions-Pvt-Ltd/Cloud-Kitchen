const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');

const Dish = sequelize.define("topdish",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    dishname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    dishprice:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    dishimage: {
        type: DataTypes.STRING, 
        allowNull: true 
    }
})


module.exports = {Dish}