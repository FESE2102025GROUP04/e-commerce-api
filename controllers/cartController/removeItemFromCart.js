const db = require('../../models');
const removeFromCart = async (req, res) => {

    try {
        const { productId } = req.body;
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const cartItem = await db.CartItem.findOne({ where: { userId, productId, status: 'active' } });

        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        await cartItem.destroy();

        return res.json({ message: "Product removed from cart" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { removeFromCart };
