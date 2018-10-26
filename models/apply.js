'use strict';
const Model = require('../models/index')

module.exports = (sequelize, DataTypes) => {
  const Apply = sequelize.define('Apply', {
    CustomerId: DataTypes.INTEGER,
    JobId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    summary: DataTypes.STRING
  }, {});
  Apply.associate = function(models) {
    // associations can be defined here
    Apply.belongsTo(models.Job)
    Apply.belongsTo(models.Customer)
  };

  Apply.getPending = function() {
    return new Promise((resolve, reject) => {
      Apply.findAndCountAll({       
        where: {
          status: 'pending'
        }
      })
      .then(data => {
          resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })    
  }

  return Apply;
};