require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const router = require("./controllers/routes/index");
const exphbs = require('express-handlebars');
const path = require('path');
const db = require("./models")
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');


const user = require("./models/User");


// SESSION
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// app.use(session(sess))


// PORT set up.

const PORT = process.env.PORT || 3001;
app.use(cookieParser()) 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine('hbs', exphbs.engine({extname:'.hbs'}));
app.set("view engine", "hbs");

// init all routes
app.use(router);
// call sync() method 
// (async () => {  await db.sequelize.sync({force:false}); })();
db.sequelize.sync({force:true}).then(() => {
    app.listen(PORT, () => console.log("Now listenting " + PORT))
})

// ENDED SYNC AND ROLE CREATION




