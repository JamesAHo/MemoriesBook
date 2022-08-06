

// Using Define model method
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                isEmail: true,
            }
        },
        username: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1-10]
            }
        },
       
        
    },
     {
        freezeTableName: false,
     })
     return User;
}