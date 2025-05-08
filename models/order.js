'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
      Order.belongsTo(models.Address, { foreignKey: 'addressId' });  

    }
  }
  Order.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure user_id is not null
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false, // Total price is required
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending', // Default status is 'Pending'
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};