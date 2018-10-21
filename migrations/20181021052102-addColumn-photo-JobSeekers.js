'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn('JobSeekers', 'photo', Sequelize.STRING );
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.removeColumn('JobSeekers', 'photo');
    
  }
};
