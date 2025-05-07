'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Log the table names to verify
    console.log("Adding constraints to tables...");

    await queryInterface.addConstraint('Users', {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'fk_users_roleId',
      references: {
        table: 'Roles', // Target table
        field: 'id', // Target column
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Addresses', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_addresses_userId',
      references: {
        table: 'Users', // Target table
        field: 'id', // Target column
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_orders_userId',
      references: {
        table: 'Users', // Target table
        field: 'id', // Target column
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
    await queryInterface.removeConstraint('Users', 'fk_users_roleId');
    await queryInterface.removeConstraint('Addresses', 'fk_addresses_userId');
    await queryInterface.removeConstraint('Orders', 'fk_orders_userId');
  },
};
