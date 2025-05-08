const db = require('../../models');

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    let cartItem = await db.CartItem.findOne({ where: { userId, productId, status: 'active' } });

    if (!cartItem) {
      await db.CartItem.create({ userId, productId, quantity, status: 'active' });
    } else {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    return res.json({ message: "Item added to cart" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { addToCart }; 
