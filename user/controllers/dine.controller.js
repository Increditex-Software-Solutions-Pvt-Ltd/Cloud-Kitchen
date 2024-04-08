const { Category } = require("../../admin/models/category.model");
const Menu = require("../../admin/models/menu.model");

const getDineinpage = async (req, res) => {
    try {
          return res.render('user/dinein')
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
}

const getDineoutpage = async (req, res) => {
    try {
          return res.render('user/dineout')
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
}
const getMenucardpage = async (req, res) => {
    try {
        // Get Veg Menu
        const vegMenu = await Menu.findAll({
            where: {
                menutype: 'Veg'
            },
            include: [{
                model: Category,
                as: 'menuCategory',
                where: {
                    
                }
            }]
        });

        
        // Get Non-Veg Menu
        const nonVegMenu = await Menu.findAll({
            where: {
                menutype: 'Non-veg'
            },
            include: [{
                model: Category,
                as: 'menuCategory', // Alias set in your association
                where: {
                 
                }
            }]
        });

        return res.render('user/menucard', { vegMenu, nonVegMenu });
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
}





module.exports = {getDineinpage,getDineoutpage,getMenucardpage}