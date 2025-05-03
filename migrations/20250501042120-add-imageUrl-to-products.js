'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add 'imageUrl' column to 'products' table
    await queryInterface.addColumn('Products', 'imageUrl', {
      type: Sequelize.STRING, // Adjust the data type as needed
      allowNull: true,        // Adjust based on whether you want the column to be nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove 'imageUrl' column if the migration is rolled back
    await queryInterface.removeColumn('products', 'imageUrl');
  }
};
