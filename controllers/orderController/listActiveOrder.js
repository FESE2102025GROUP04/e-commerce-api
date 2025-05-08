const db = require('../../models');

const getActiveOrders = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        // Fetch active orders
        const activeOrders = await db.Order.findAll({
            where: {
                userId,
                status: { [db.Sequelize.Op.not]: ['Completed', 'Canceled'] }
            },
            include: [{ model: db.OrderItem }]  // Include order items if needed
        });

        return res.json({ activeOrders });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getActiveOrders };
