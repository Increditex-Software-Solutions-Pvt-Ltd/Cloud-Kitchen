const { Category } = require("../../admin/models/category.model");
const Menu = require("../../admin/models/menu.model");

const getVegmenupage = async (req, res) => {
    try {
        const menu = await Menu.findAll({
            include: {
                model: Category,
                as: 'menuCategory',
            },
        });

        const categories = await Category.findAll();

        // Filter only veg menus
        const vegMenu = menu.filter(menuItem => menuItem.menutype === 'Veg');

        return res.render('user/vegmenu', { categories, menu: vegMenu });
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
};
const getNonvegmenupage = async (req, res) => {
    try {
        const menu = await Menu.findAll({
            include: {
                model: Category,
                as: 'menuCategory',
            },
        });

        const categories = await Category.findAll();

        // Filter only veg menus
        const nonvegMenu = menu.filter(menuItem => menuItem.menutype === 'Non-veg');

        return res.render('user/nonvegmenu', { categories, menu: nonvegMenu });
    } catch (error) {
        console.error('Error executing Sequelize query: ', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = { getVegmenupage,getNonvegmenupage };
