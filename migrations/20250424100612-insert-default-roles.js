'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert roles into the roles table
    await queryInterface.bulkInsert('Roles', [
      { id: 0, nameRole: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { id: 1, nameRole: 'consumer', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the roles
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
