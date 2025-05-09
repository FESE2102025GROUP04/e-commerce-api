const db = require('../../models');

const getCategory = async (req, res) => {
    try {
        const category = await db.Category.findByPk(req.params.id, {
            include: [db.Product] // Include associated products
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving category', error });
    }
};

module.exports = { getCategory };