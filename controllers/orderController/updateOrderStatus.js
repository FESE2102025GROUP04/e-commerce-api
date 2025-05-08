const db = require('../../models');

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;
       

        const order = await db.Order.findOne({
            where: { id: orderId }
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const statusTransitions = {
            'pending': ['accepted'],
            'accepted': ['processing'],
            'processing': ['delivering'],
            'delivering': ['completed', 'cancelled']
        };

        const validStatuses = statusTransitions[order.status] || [];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({ error: `Cannot transition from ${order.status} to ${newStatus}` });
        }

        order.status = newStatus;
        await order.save();

        return res.json({ message: 'Order status updated successfully', order });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { updateOrderStatus };
