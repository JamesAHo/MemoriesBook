
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        
        postId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement : true,
          
          
    
        },
        title: {
            type: DataTypes.TEXT,
            required: true,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
            
        },
       
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: false,
        underscored: false,
        modelName: 'posts',
        tableName: 'posts',
    }
    );

    module.exports = Post;






