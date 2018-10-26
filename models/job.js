'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    name: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    academic: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    isOpen: DataTypes.BOOLEAN,
    CompanyId: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
    Job.belongsTo(models.Category)
    Job.belongsTo(models.Company)
    Job.hasMany(models.Apply)
  };

  Job.prototype.getYearSalary = function() {
    return this.salary * 12
  }
  return Job;
};