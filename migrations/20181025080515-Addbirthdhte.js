'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Customers','birthdate', { type: Sequelize.DATE });
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('Customers','birthdate', { type: Sequelize.DATE });
    
  }
};
