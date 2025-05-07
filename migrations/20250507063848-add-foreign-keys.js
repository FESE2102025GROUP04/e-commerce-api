'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key for orderId in OrderItems table
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitems_orderId').catch(() => {
      console.log('Constraint fk_orderitems_orderId does not exist, skipping removal.');
    });
    await queryInterface.addConstraint('OrderItems', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'fk_orderitems_orderId',
      references: {
        table: 'Orders',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Add foreign key for productId in OrderItems table
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitems_productId').catch(() => {
      console.log('Constraint fk_orderitems_productId does not exist, skipping removal.');
    });
    await queryInterface.addConstraint('OrderItems', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_orderitems_productId',
      references: {
        table: 'Products',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Add foreign key for categoryId in Products table
    await queryInterface.removeConstraint('Products', 'fk_products_categoryId').catch(() => {
      console.log('Constraint fk_products_categoryId does not exist, skipping removal.');
    });
    await queryInterface.addConstraint('Products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'fk_products_categoryId',
      references: {
        table: 'Categories',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key for orderId in OrderItems table
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitems_orderId');

    // Remove foreign key for productId in OrderItems table
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitems_productId');

    // Remove foreign key for categoryId in Products table
    await queryInterface.removeConstraint('Products', 'fk_products_categoryId');
  },
};