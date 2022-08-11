require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const router = require("./controllers/routes/index");
const exphbs = require('express-handlebars');
const path = require('path');
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });









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

app.use(session(sess))


// PORT set up.

const PORT = process.env.PORT || 3001;
app.engine('handlebars', hbs.engine);
app.use(cookieParser()) 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.engine('hbs', exphbs.engine({extname:'.hbs'}));
app.set("view engine", "hbs");

// init all routes
app.use(router);
// call sync() method 

sequelize.sync({force:true}).then(() => {
    app.listen(PORT, () => console.log("Now listenting " + PORT))
})


// ENDED SYNC AND ROLE CREATION




module.exports = app;