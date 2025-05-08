const db = require('../../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '24h'; // Token expiration time

const authenticationController = {
  // Register (sign up)
  register: async (req, res) => {
    try {
      const { userName, email, password, roleId = 0 } = req.body;
      
      if (!userName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Validate roleId - only accept 0 (customer) or 1 (admin)
      const sanitizedRoleId = [0, 1].includes(Number(roleId)) ? Number(roleId) : 0;
      
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        roleId: sanitizedRoleId 
      });
      
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, roleId: newUser.roleId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      return res.status(201).json({
        message: 'User registered successfully.',
        user: { id: newUser.id, email: newUser.email, roleId: newUser.roleId },
        token
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },
  
  login: async (req, res) => {
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
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, roleId: user.roleId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      return res.status(200).json({
        message: 'Login successful.',
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          roleId: user.roleId
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },
  
  // Verify token middleware
  verifyToken: (req, res, next) => {
    try {
      // Get token from authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }
      
      const token = authHeader.split(' ')[1];
      
      // Verify token
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }
        
        // Add decoded user data to request object
        req.user = decoded;
        next();
      });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
 getCurrentUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      
      const user = await User.findByPk(userId, {
        attributes: ['id', 'userName', 'email', 'roleId']
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(200).json({ user });
    } catch (error) {
      console.error('Get current user error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const roleMiddleware = {
  requireAdmin: (req, res, next) => {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
  },
  
  requireCustomer: (req, res, next) => {
    if (req.user.roleId !== 0) {
      return res.status(403).json({ message: 'Access denied. Customer privileges required.' });
    }
    next();
  }
};

module.exports = { ...authenticationController, roleMiddleware };