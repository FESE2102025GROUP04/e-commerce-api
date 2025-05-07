'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the isDefault column to the Addresses table
    await queryInterface.addColumn('Addresses', 'isDefault', {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Default to false (not default address)
      allowNull: false,    // Cannot be null
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the isDefault column from the Addresses table
    await queryInterface.removeColumn('Addresses', 'isDefault');
  },
};