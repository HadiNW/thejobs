'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    CompanyId: DataTypes.INTEGER,
    mame: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    type: DataTypes.STRING,
    academic: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    isOpen: DataTypes.BOOLEAN
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
  };
  return Job;
};