const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    }


    
    
    
    

  },
  {
    sequelize,
    timestamps: true,
   tableName: 'comments',
    modelName: 'comment',
    
  }
);

module.exports = Comment;