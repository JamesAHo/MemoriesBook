const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    
    content: {
      type: DataTypes.STRING,
      allowNull: false,
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
    timestamps: false,
   
    modelName: 'comment',
    
  }
);

module.exports = Comment;