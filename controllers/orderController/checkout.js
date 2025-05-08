const db = require('../../models');

const checkoutCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        let { addressId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        if (!addressId) {
            const defaultAddress = await db.Address.findOne({
                where: { userId, isDefault: true }
            });

            if (!defaultAddress) {
                return res.status(400).json({ error: 'No address provided and no default address found' });
            }

            addressId = defaultAddress.id;
        }

        const cartItems = await db.CartItem.findAll({
            where: { userId, status: 'active' },
            include: [{ model: db.Product }]
        });

        if (!cartItems.length) {
            return res.status(400).json({ error: 'No items in cart to checkout' });
        }

        let totalPrice = 0;
        for (const item of cartItems) {
            totalPrice += item.quantity * item.Product.price;
        }

        const order = await db.Order.create({
            userId,
            addressId,
            totalPrice,
            status: 'pending'
        });

        for (const item of cartItems) {
            await db.OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price
            });

            const product = await db.Product.findByPk(item.productId);
            
            if (product) {
                if (product.stockQty >= item.quantity) {
                    product.stockQty -= item.quantity;
                    await product.save();
                } else {
                    return res.status(400).json({ error: `Not enough stock for product ${item.Product.name}` });
                }
            }

            item.status = 'completed';
            await item.save();
        }

        return res.json({ message: 'Checkout successful', orderId: order.id });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { checkoutCart };
