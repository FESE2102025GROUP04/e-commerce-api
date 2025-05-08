const db = require('../../models');

const getProduct = async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id, {
            include: [db.Category] 
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving product', error });
    }
};

module.exports = { getProduct };