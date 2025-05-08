// controllers/registerController.js
const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      status: 1
    });

    return res.status(201).json({ 
      message: 'User registered successfully.', 
      user: { id: newUser.id, email: newUser.email } 
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = registerController;
