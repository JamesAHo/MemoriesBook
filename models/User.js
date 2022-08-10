const bcrypt = require("bcrypt");
// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = require('../config/connection');

//Using Define model method
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isEmail: true,
        },
      },
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1 - 10],
        },
      },
    },
    {
        instanceMethods:{
            checkPassword:  function (loginPw) {
                console.log(loginPw);
                const hashedpassword = bcrypt.compareSync(pass, this.password);
                console.log(hashedpassword);
                return hashedpassword;
          }}
    },

    {
      tableName: "user",
      hooks: {
        beforeSave: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
        },
      },
      
    },
    {
      modelName: "user",
      freezeTableName: true,
    }
  );
 
  
  return User;
};
