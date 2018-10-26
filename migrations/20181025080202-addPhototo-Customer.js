'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.addColumn('Customers', 'photo', { type: Sequelize.STRING });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.removeColumn('Customers', 'photo');
    
  }
};
