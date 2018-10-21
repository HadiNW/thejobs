'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    headline: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    foundedOn: DataTypes.DATE,
    totalEmployee: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    logo: DataTypes.STRING,
    details: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
  };
  return Company;
};