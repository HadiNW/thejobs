'use strict';
const helper = require('../helpers/helper');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    headline: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthdate: DataTypes.STRING,
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
    password: DataTypes.STRING,
    cv: DataTypes.STRING,
    academic: DataTypes.STRING,
    salt: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        const salt = helper.generateSalt()
        user.password = helper.generateHash(user.password, salt)
        user.salt = salt
      }
    }
  });
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.hasMany(models.Apply)
  };
  return Customer;
};