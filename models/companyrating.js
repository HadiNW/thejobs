'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyRating = sequelize.define('CompanyRating', {
    JobSeekerId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {});
  CompanyRating.associate = function(models) {
    // associations can be defined here
  };
  return CompanyRating;
};