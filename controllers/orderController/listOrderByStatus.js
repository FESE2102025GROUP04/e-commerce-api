const db = require('../../models');

const listAdminOrders = async (req, res) => {
    try {
        const { status } = req.query;

        let whereClause = {};

        if (status === 'history') {
            whereClause.status = ['Completed', 'Cancelled'];
        } else if (status) {
            whereClause.status = status;
        }

        const orders = await db.Order.findAll({
            where: whereClause,
            include: [{ model: db.OrderItem }, { model: db.User }, { model: db.Address }],
            order: [['createdAt', 'DESC']]
        });

        return res.json({ orders });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { listAdminOrders };
