const db = require('../../models');

const getTop10ProductsByQuantity = async (req, res) => {
    try {
        // Fetch the top 10 products based on the total quantity sold
        const topProducts = await db.OrderItem.findAll({
            attributes: [
                'productId',
                [db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'totalQuantity']
            ],
            include: [{
                model: db.Product,
                attributes: ['id', 'productName'] 
            }],
            group: ['productId'],
            order: [[db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'DESC']], // Order by total quantity sold
            limit: 10 // Limit to top 10
        });

        const topProductsData = topProducts.map(item => ({
            productId: item.productId,
            productName: item.Product.productName,
            totalQuantity: item.dataValues.totalQuantity
        }));

        return res.json({ topProducts: topProductsData });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getTop10ProductsByQuantity };
