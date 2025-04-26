const db = require('../../models');

const listAllUser = async (req, res) => {
    const userTb = await db.User.findAll({
        attributes: ["userName"]
    })

    return res.json(userTb);
}

module.exports = { listAllUser };