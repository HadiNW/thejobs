'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobSeeker = sequelize.define('JobSeeker', {
    name: DataTypes.STRING,
    headline: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    lastSalary: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'please enter a valid email format '
        },
        len: {
          args: [8, 20],
          msg: 'password is only 8 to 20 chars'
        } 
      }
    },
    password: DataTypes.STRING
  }, {
    // hooks: {
    //   afterValidate: (user, option) => {
    //     user.password = 'ooooo'
    //   }
    //}
  });
  JobSeeker.associate = function(models) {
    // associations can be defined here
  };
  return JobSeeker;
};