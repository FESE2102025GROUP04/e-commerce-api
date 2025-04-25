const { where } = require('sequelize');
const db = require('../../models');

const listAllAdmin= async (req, res) => {
    try {
        const admin = await db.User.findAll({
            where: { roleId: 1 },
            attributes: [ "username" ]
        });


        return res.json(admin);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { listAllAdmin };