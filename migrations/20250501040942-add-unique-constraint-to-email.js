'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add UNIQUE constraint to email column in Users table
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint' // this name is optional but helpful
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the UNIQUE constraint
    await queryInterface.removeConstraint('Users', 'unique_email_constraint');
  }
};
