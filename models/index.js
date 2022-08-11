const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');



User.hasMany(Post, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});


Post.belongsTo(User, {
  foreignKey: 'id'
});

User.hasMany(Comment, {
  foreignKey: 'comment_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'comment_id',
});

//POST COMMENT RELATIONSHIP
Post.hasMany(Comment, {
  foreignKey: 'postId',
  as:'comment'
})
Comment.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'posts'
})


module.exports = { User, Post , Comment};

