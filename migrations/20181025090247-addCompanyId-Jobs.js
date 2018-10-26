'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn('Jobs', 'CompanyId',{ type: Sequelize.INTEGER });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Jobs', 'CompanyId',{ type: Sequelize.INTEGER });
  }
};
