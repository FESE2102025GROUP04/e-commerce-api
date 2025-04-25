const db = require('../../models')

const addUser = async (req, res) => {
    try {
        const user = req.body;

        if (!Array.isArray(user)) {
            user = [user];
        }

        const admin = user.map(user => ({
            ...user,
            roleId: 1
        }))

        console.log("User have been added to DB:", user);

        const userTb = await db.User.bulkCreate(admin);

        return res.json(userTb);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }


}

module.exports = { addUser };