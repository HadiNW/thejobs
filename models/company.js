'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    headline: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    foundedOn: DataTypes.STRING,
    phone: DataTypes.STRING,
    deatil: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.Job)
  };
  return Company;
};