const { where } = require('sequelize');
const db = require('../../models');

const viewAdminDetail = async (req, res) => {
    try {
        const userId = req.params.id;

        const admin = await db.User.findOne({
            where: {
                roleId: 1,
                id:userId
            },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.json(admin);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { viewAdminDetail };