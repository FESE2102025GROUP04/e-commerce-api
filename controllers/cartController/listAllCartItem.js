const db = require("../../models");

const listCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;


        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const cartItems = await db.CartItem.findAll({
            where: { userId, status: 'active' },
            include: [
                {
                    model: db.Product,
                    attributes: ['productName', 'price', 'imageUrl']
                }
            ],
            attributes: ['id', 'quantity']
        });

        return res.json(cartItems);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = { listCartItems };
