const db = require('../../models');

const createAddress = async (req, res) => {
    try {
        const { street, city, country, postalCode, userId: userIdFromBody, isDefault } = req.body;
        const finalUserId = req.user?.id || userIdFromBody;

        if (!finalUserId) {
            return res.status(400).json({ error: "userId is required" });
        }

        // If isDefault is true, set all others to false first
        if (isDefault) {
            await db.Address.update(
                { isDefault: false },
                { where: { userId: finalUserId } }
            );
        }

        // Create the address
        const addressTb = await db.Address.create({
            userId: finalUserId,
            street,
            city,
            country,
            postalCode,
            isDefault: isDefault || false
        });

        // Check if user has no default → set this one as default
        const defaultCount = await db.Address.count({
            where: { userId: finalUserId, isDefault: true }
        });

        if (defaultCount === 0) {
            await addressTb.update({ isDefault: true });
        }

        return res.json(addressTb);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createAddress };
