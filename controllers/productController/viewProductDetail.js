const { where } = require('sequelize');
const db = require('../../models');

const viewProductDetail = async (req, res) => {
    try {
        const productId = req.params.id;

        const consumer = await db.Product.findOne({
            where: {
                id: productId
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        if (!consumer) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(consumer);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { viewProductDetail };