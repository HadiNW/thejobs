'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobSeekerEducation = sequelize.define('JobSeekerEducation', {
    degree: DataTypes.STRING,
    university: DataTypes.STRING,
    major: DataTypes.STRING,
    dateFrom: DataTypes.DATE,
    dateTo: DataTypes.DATE,
    description: DataTypes.STRING,
    JobSeekerId: DataTypes.INTEGER
  }, {});
  JobSeekerEducation.associate = function(models) {
    // associations can be defined here
  };
  return JobSeekerEducation;
};