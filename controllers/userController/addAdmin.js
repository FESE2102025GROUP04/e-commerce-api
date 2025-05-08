const db = require('../../models');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    try {
        let users = req.body;

        if (!Array.isArray(users)) {
            users = [users];
        }

        // Hash password for each user
        const admin = await Promise.all(users.map(async user => {
            const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds
            return {
                ...user,
                password: hashedPassword,
                roleId: 1,
                status: 1
            };
        }));

        // Check if email already exists in the database
        for (let user of admin) {
            const existingUser = await db.User.findOne({ where: { email: user.email } });
            if (existingUser) {
                return res.status(400).json({ message: `The email ${user.email} is already in use.` });
            }
        }

        console.log("User(s) added to DB:", admin);

        const userTb = await db.User.bulkCreate(admin);

        return res.json(userTb);
    } catch (err) {
        // Catch and return any errors
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { addUser };
