const db = require("../../models");


const listCategories = async (req, res, next) => {

    const categoryTb = await db.Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "ca"] }
    });

    return res.json(categoryTb);
};

module.exports = { listCategories };
