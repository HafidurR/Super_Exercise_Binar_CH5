'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Car.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name required"
        },
        notEmpty: {
          args: true,
          msg: "Name cannot be empty",
        },
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Code already registered, use another code",
      },
      validate: {
        notNull: {
          args: true,
          msg: "Code required"
        },
        notEmpty: {
          args: true,
          msg: "Code cannot be empty",
        },
      }
    },
    number_of_gears: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Number_of_gears required"
        },
        notEmpty: {
          args: true,
          msg: "Number_of_gears cannot be empty",
        },
        isInt: {
          args: true,
          msg: "Age must be an integer value",
        }
      }
    },
    number_of_tires: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Number_of_tires required",
        },
        notEmpty: {
          args: true,
          msg: "Number_of_tires cannot be empty",
        },
        isInt: {
          args: true,
          msg: "Age must be an integer value",
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};