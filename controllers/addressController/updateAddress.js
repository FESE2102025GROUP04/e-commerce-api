const db = require('../../models');

const updateAddress = async (req, res) => {
    try {
        const { street, city, country, postalCode, isDefault } = req.body;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: "Address ID is required" });
        }

        const address = await db.Address.findByPk(id);
        if (!address) {
            return res.status(404).json({ error: "Address not found" });
        }

        if (isDefault) {
            await db.Address.update(
                { isDefault: false },
                { where: { userId: address.userId } }
            );
        }

        const [countUpdateAddress] = await db.Address.update(
            { street, city, country, postalCode, isDefault },
            { where: { id } }
        );

        const defaultCount = await db.Address.count({
            where: { userId: address.userId, isDefault: true }
        });

        if (defaultCount === 0) {
            await db.Address.update(
                { isDefault: true },
                { where: { id } }
            );
        }

        return res.json({ message: `${countUpdateAddress} address(es) has been updated.` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = { updateAddress };