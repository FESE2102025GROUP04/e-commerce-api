const { Op, fn, col, where } = require('sequelize');
const db = require('../../models');

const searchForAdmin = async (req, res) => {
    try {
        const { keyword } = req.body;

        if (!keyword) {
            return res.status(400).json({ error: "Keyword is required" });
        }

        const lowerKeyword = keyword.toLowerCase();

        const matchUser = await db.User.findAll({
            where: {
                roleId: 0,
                [Op.or]: [
                    where(fn('LOWER', col('userName')), { [Op.like]: `${lowerKeyword}%` }),
                    where(fn('LOWER', col('email')), { [Op.like]: `${lowerKeyword}%` })
                ]
            },
            attributes: ["userName", "email"]
        });

        if (matchUser.length === 0) {
            return res.json({ message: "Admin does not exist" });
        } else {
            return res.json(matchUser);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { searchForAdmin };
