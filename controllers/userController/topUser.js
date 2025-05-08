const db = require('../../models');

const getTop10UsersByTotalSpent = async (req, res) => {
    try {
        // Fetch the top 10 users with the highest total purchase amount
        const topUsers = await db.Order.findAll({
            attributes: [
                'userId',
                [db.Sequelize.fn('SUM', db.Sequelize.col('totalPrice')), 'totalSpent']
            ],
            group: ['userId'],
            order: [[db.Sequelize.fn('SUM', db.Sequelize.col('totalPrice')), 'DESC']],
            limit: 10
        });

        const topUsersData = topUsers.map(user => ({
            userId: user.userId,
            totalSpent: parseFloat(user.dataValues.totalSpent)
        }));

        return res.json({ topUsers: topUsersData });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getTop10UsersByTotalSpent };
