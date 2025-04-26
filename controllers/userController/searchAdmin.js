const { Op } = require('sequelize');


const db = require('../../models');

const searchForAdmin = async (req, res) => {
    try {
        const { keyword } = req.body;

        if (!keyword) {
            return;
        }

        const matchUser = await db.User.findAll({
            where: {
                roleId: 0, // Assuming you meant "roleId" instead of "roldId"
                [Op.or]: [
                    { userName: { [Op.like]: `${keyword}%` } },
                    { email: { [Op.like]: `${keyword}%` } }
                ]
            },
            attributes: ["userName", "email"]
        });  

if (matchUser.length === 0) {
    return res.json({ message: "Admin does not exist" });
}
else {
    return res.json(matchUser);
}
    }
    catch (err) {
    return res.json({ error: err.message })
}

}

module.exports = { searchForAdmin };