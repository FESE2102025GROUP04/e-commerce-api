const { where } = require('sequelize');
const db = require('../../models');

const viewCosumerDetail = async (req, res) => {
    try {
        const userId = req.params.id;

        const consumer = await db.User.findOne({
            where: {
                roleId: 0,
                id: userId
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        if (!consumer) {
            return res.status(404).json({ message: "Consumer not found" });
        }

        return res.json(consumer);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { viewCosumerDetail };