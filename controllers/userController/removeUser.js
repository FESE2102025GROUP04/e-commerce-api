const { Model } = require("sequelize");
const db = require('../../models');

const removeUser = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || ids.length === 0) {
            return res.status(400).json({ error: "No User Selected" });
        }

        const deletedUserCount = await db.User.destroy({ where: { id: ids } });
        return res.json({ message: `${deletedUserCount} users are deleted` })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { removeUser };