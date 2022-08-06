// const dbConfig = require("../config/db-config");
// const Sequelize = require("sequelize");


// const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.DIALECT
// });

// const db = {};
// db.sequelize = sequelize;
// db.models = {};
// db.models.User = require("./User")(sequelize, Sequelize.DataTypes)
// db.models.Post = require("./Post")(sequelize, Sequelize.DataTypes)


// db.Post.belongsToMany(db.user, {
//   foreignkey: 'user_id',
//   onDelete: 'CASCADE'
// });
// db.User.hasMany(db.Post, {
//   foreignkey: 'user_id'
// });
const User = require('./User');
const Post = require('./Post');


User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };


//module.exports = db;