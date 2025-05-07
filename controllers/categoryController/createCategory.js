const db = require('../../models')

const createCategory = async (req, res) => {
    try {
        const category = req.body;
        console.log("Received Category: ", category);

        const categoryTb = await db.Category.bulkCreate(category);

        return res.json(categoryTb);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createCategory };
