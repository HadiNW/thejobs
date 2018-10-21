'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobSeekerExperience = sequelize.define('JobSeekerExperience', {
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    dateFrom: DataTypes.DATE,
    dateTo: DataTypes.DATE,
    description: DataTypes.STRING,
    JobSeekerId: DataTypes.INTEGER
  }, {});
  JobSeekerExperience.associate = function(models) {
    // associations can be defined here
  };
  return JobSeekerExperience;
};