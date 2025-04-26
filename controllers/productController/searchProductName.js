const { Op } = require('sequelize');


const db = require('../../models');

const searchForProduct = async (req, res) => {
    try {
        const { keyword } = req.body;

        if (!keyword) {
            return;
        }

        const matchProduct = await db.Product.findAll({
            where: {
                productName: { [Op.like]: `${keyword}%` }
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });  

if (matchProduct.length === 0) {
    return res.json({ message: "Product does not exist" });
}
else {
    return res.json(matchProduct);
}
    }
    catch (err) {
    return res.json({ error: err.message })
}

}

module.exports = { searchForProduct };