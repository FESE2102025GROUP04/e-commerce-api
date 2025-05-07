const { Op, fn, col, where } = require('sequelize');
const db = require('../../models');

const searchForAddress = async (req, res) => {
    try {
        const { keyword } = req.body;

        if (!keyword) {
            return res.status(400).json({ error: "Keyword is required" });
        }

        const lowerKeyword = keyword.toLowerCase();

        const matchAddress = await db.Address.findAll({
            where: {
                [Op.or]: [
                    where(fn('LOWER', col('street')), { [Op.like]: `${lowerKeyword}%` }),
                    where(fn('LOWER', col('city')), { [Op.like]: `${lowerKeyword}%` }),
                    where(fn('LOWER', col('country')), { [Op.like]: `${lowerKeyword}%` }),
                    where(fn('LOWER', col('postalCode')), { [Op.like]: `${lowerKeyword}%` })
                ]
            },
            attributes: ["street", "city", "country", "postalCode"]
        });

        if (matchAddress.length === 0) {
            return res.json({ message: "No address found" });
        } else {
            return res.json(matchAddress);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { searchForAddress };
