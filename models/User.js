// Using Define model method
// module.exports = (sequelize, DataTypes) => {

//   const User = sequelize.define("user", {
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    content: DataTypes.STRING,

  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user',
    freezeTableName: false,
  }
  );

module.exports = User;

