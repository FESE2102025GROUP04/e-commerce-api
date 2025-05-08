const db = require('../../models');

const getTotalPurchasedPriceByDay = async (req, res) => {
    try {
        const orders = await db.Order.findAll({
            attributes: [
                [db.Sequelize.fn('DATE', db.Sequelize.col('Order.createdAt')), 'date'],  // Group by date
                [db.Sequelize.fn('SUM', db.Sequelize.col('Order.totalPrice')), 'totalPrice']  // Sum the totalPrice
            ],
            group: [db.Sequelize.fn('DATE', db.Sequelize.col('Order.createdAt'))],  // Group by date
            order: [[db.Sequelize.fn('DATE', db.Sequelize.col('Order.createdAt')), 'ASC']]  // Order by date (same as in GROUP BY)
        });

        const chartData = orders.map(order => ({
            date: order.dataValues.date,
            totalPrice: parseFloat(order.dataValues.totalPrice)
        }));

        return res.json({ chartData });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getTotalPurchasedPriceByDay };
