const { Op, fn, col, where } = require('sequelize');
const db = require('../../models');

const searchForCategory = async (req, res) => {
    try {
        const { keyword } = req.body;

        if (!keyword) {
            return;
        }

        const matchCategory = await db.Category.findAll({
            where: where(
                fn('LOWER', col('categoryName')),
                {
                    [Op.like]: `${keyword.toLowerCase()}%`
                }
            ),
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });  

if (matchCategory.length === 0) {
    return res.json({ message: "Category does not exist" });
}
else {
    return res.json(matchCategory);
}
    }
    catch (err) {
    return res.json({ error: err.message })
}

}

module.exports = { searchForCategory };