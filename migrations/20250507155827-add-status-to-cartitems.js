'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the status column to the CartItems table
    await queryInterface.addColumn('CartItems', 'status', {
      type: Sequelize.STRING,
      allowNull: true, // Optional: Set to false if this field is required
      defaultValue: null, // Optional: Set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the status column from the CartItems table
    await queryInterface.removeColumn('CartItems', 'status');
  },
};