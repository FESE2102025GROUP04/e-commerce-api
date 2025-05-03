// controllers/loginController.js
const db = require('../../models');
const User = db.User;
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
    

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    if(!user.status){
        return res.status(403).json({ message: "Your account is deactivated" });
    }

    return res.status(200).json({ 
      message: 'Login successful.',
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        roleId: user.roleId
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { loginController };
