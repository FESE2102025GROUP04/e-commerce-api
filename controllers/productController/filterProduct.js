const db = require('../../models');

const filterProducts = async (req, res) => {
    try {
        const { categoryId, stockStatus } = req.query;
        const whereClause = {};

        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        if (stockStatus) {
            whereClause.stockStatus = stockStatus;
        }

        const products = await db.Product.findAll({
            where: whereClause,
            include: [db.Category]  // 🔥 remove the 'as' here
        });

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error filtering products', error });
    }
};

module.exports = { filterProducts };
