const db = require('../../models');

const cancelOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { orderId } = req.body;


        console.log('req.body:', req.body);

        if (!userId) {
            return res.status(400).json({ error: 'userId are required' });
        }

        if (!orderId) {
            return res.status(400).json({ error: 'orderId are required' });
        }



        const order = await db.Order.findOne({
            where: { id: orderId, userId }
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status === 'Delivering') {
            return res.status(400).json({ error: 'Cannot cancel an order that is delivering' });
        }

        await db.OrderItem.destroy({
            where: { orderId: order.id }
        });

        await order.destroy();

        return res.json({ message: 'Order cancelled successfully' });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { cancelOrder };
