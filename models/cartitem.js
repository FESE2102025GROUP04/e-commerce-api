'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.User, { foreignKey: 'userId' });
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  CartItem.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: { 
      type: DataTypes.STRING,
      allowNull: false, 
      defaultValue: "active",
    },
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};