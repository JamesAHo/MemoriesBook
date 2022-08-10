const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

const db = {};
db.sequelize = sequelize;
// db.models = {};
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Post = require("./Post")(sequelize, Sequelize.DataTypes);
db.Comment = require("./Comment")(sequelize, Sequelize.DataTypes);
// make new model

db.User.hasMany(db.Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'

});
db.User.hasMany(db.Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
db.Post.belongsTo(db.User,{
    foreignKey: 'user_id',
    
})
db.Comment.belongsTo(db.User, {
    foreignKey: 'user_id',
    
})

// db.User.checkPassword = function (pass) {
//     console.log(pass)
//     const hashedpassword = bcrypt.compareSync(pass, this.password);
//     console.log(hashedpassword)
//     return hashedpassword;
// }

module.exports = db;