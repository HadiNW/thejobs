'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.addColumn('Customers', 'salt', { type: Sequelize.STRING });
    
  },

  down: (queryInterface, Sequelize) => {
    
   
      return queryInterface.removeColumn('Customers', 'salt');
    
  }
};
