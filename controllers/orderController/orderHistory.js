const db = require('../../models');

const getOrderHistory = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        // Fetch completed or canceled orders (order history)
        const orderHistory = await db.Order.findAll({
            where: {
                userId,
                status: ['Completed', 'Canceled']
            },
            include: [{ model: db.OrderItem }]  // Include order items if needed
        });

        if(orderHistory.length === 0){
            return res.json({ message: "No successful orders have been made." });
        }
        return res.json({ orderHistory });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getOrderHistory };
