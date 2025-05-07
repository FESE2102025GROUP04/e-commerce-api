const db = require("../../models");

const listAddress = async (req, res) => {

    const addressTb = await db.Address.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"]}
    });
    return res.json(addressTb);
};

module.exports = { listAddress };
