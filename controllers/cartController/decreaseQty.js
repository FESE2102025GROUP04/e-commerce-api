const db = require('../../models');

const decreaseCartItemQty = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const cartItem = await db.CartItem.findOne({ where: { userId, productId, status: 'active' } });

        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        cartItem.quantity -= quantity;

        if (cartItem.quantity <= 0) {
            await cartItem.destroy();
        } else {
            await cartItem.save();
        }

        return res.json({ message: "Cart item updated" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = { decreaseCartItemQty };


