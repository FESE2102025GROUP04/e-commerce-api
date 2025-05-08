const db = require('../../models');
const User = db.User;


const adminController = {
  // Get admin dashboard data
  getDashboard: async (req, res) => {
    try {
      // Get admin user info
      const adminId = req.user.userId;
      const admin = await User.findByPk(adminId, {
        attributes: ['id', 'userName', 'email', 'roleId']
      });

      if (!admin || admin.roleId !== 1) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const userCount = await User.count();
      
      const mockStats = {
        productCount: 42,
        orderCount: 18,
        revenue: 2547.99,
        pendingOrders: 5
      };

      return res.status(200).json({
        message: 'Admin dashboard data retrieved successfully',
        adminInfo: admin,
        stats: {
          userCount,
          ...mockStats
        },
      });
    } catch (error) {
      console.error('Admin dashboard error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'userName', 'email', 'roleId', 'createdAt']
      });

      return res.status(200).json({
        message: 'Users retrieved successfully',
        users
      });
    } catch (error) {
      console.error('Get all users error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },

  updateUserRole: async (req, res) => {
    try {
      const { userId, roleId } = req.body;

      if (!userId || roleId === undefined) {
        return res.status(400).json({ message: 'User ID and role ID are required.' });
      }

      if (![0, 1].includes(Number(roleId))) {
        return res.status(400).json({ message: 'Invalid role ID. Must be 0 or 1.' });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      await user.update({ roleId: Number(roleId) });

      return res.status(200).json({
        message: 'User role updated successfully',
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          roleId: user.roleId
        }
      });
    } catch (error) {
      console.error('Update user role error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      if (user.id === req.user.userId) {
        return res.status(400).json({ message: 'Cannot delete your own account.' });
      }

      await user.destroy();

      return res.status(200).json({
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Delete user error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

module.exports = adminController;