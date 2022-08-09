const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

//Using Define model method
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
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
        tableName: "user",
        hooks: {
            beforeSave: function(req, res,next) {
                const user = this;
                if (!user.findOne({where: {password: "password" }})) {
                    return next();
                }
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (_, hash) =>{
                        user.password = hash;
                        
                    })
                })
            }
        }
            
    }
    );
    User.prototype.ComparePassword = function(password, done)  {
        bcrypt.compare(password, this.password, (err, isMatch) =>{
            done(err, isMatch)
        });
    }
    
     return User;
}

   
