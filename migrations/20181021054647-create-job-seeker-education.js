'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobSeekerEducations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      degree: {
        type: Sequelize.STRING
      },
      university: {
        type: Sequelize.STRING
      },
      major: {
        type: Sequelize.STRING
      },
      dateFrom: {
        type: Sequelize.DATE
      },
      dateTo: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      JobSeekerId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('JobSeekerEducations');
  }
};