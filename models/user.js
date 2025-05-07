'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(Role, { foreignKey: 'roleId' });
      User.hasMany(Address, { foreignKey: 'userId' });
      User.hasMany(Order, { foreignKey: 'userId' });
      User.hasMany(CartItem, { foreignKey: 'userId' });

    }
  }
  User.init({
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false, // username is required
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // email is required
      unique: true,
      defaultValue: '', // default to empty string if not provided

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // allow null for special cases (e.g., OAuth login)
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // default status is active
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
