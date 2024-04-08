const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');
const { Category } = require('./category.model');

const Menu = sequelize.define("menu",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    category:{
        type:DataTypes.INTEGER,
        references:{
            model:Category,
            key:'id'
        },
        allowNull:false
    },
    menutype:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: true 
    }
})

Menu.belongsTo(Category,{foreignKey:'category',targetKey:'id',as:'menuCategory'});
Category.hasMany(Menu,{foreignKey:'category',sourceKey:'id',as:'categoryMenu'})


module.exports = Menu