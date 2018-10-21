'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApplyJob = sequelize.define('ApplyJob', {
    JobSeekerId: DataTypes.INTEGER,
    JobId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  ApplyJob.associate = function(models) {
    // associations can be defined here
  };
  return ApplyJob;
};