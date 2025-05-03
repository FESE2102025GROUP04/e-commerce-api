'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'stockStatus', {
      type: Sequelize.ENUM('available', 'unavailable'),
      defaultValue: 'available',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'stockStatus');
  }
};