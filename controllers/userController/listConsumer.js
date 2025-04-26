const { where } = require('sequelize');
const db = require('../../models');

const listAllConsumer= async (req, res) => {
    try {
        const consumer = await db.User.findAll({
            where: { roleId: 0 },
            attributes: [ "userName" ]
        });


        return res.json(consumer);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { listAllConsumer };