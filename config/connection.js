const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize

if(process.env.AWSDB_LINK) {
    sequelize = new Sequelize(process.env.AWSDB_LINK);
    console.log("Database is running!");
} else {
    sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
     {
    host:"localhost",
    port:3306,
    dialect:'mysql',
     }
  )  
}



module.exports = sequelize;