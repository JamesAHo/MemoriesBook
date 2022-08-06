require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./controllers/routes/index");
const exphbs = require('express-handlebars');

const db = require("./models")
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");

const user = require("./models/User");

//Initial passport auth
// initializePassport(passport, email => {
//      user.find(user => user.email === email),
//     id => user.find(user => user.id === id)
// })
// use flash
// app.use(flash)
// use session
// app.use(session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 3600000 
//     }
// }))
// Use passport
// app.use(passport.initialize())
// app.use(passport.session())


// PORT set up.

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine('hbs', exphbs.engine({extname:'.hbs'}));
app.set("view engine", "hbs");

// init all routes
app.use(router);
// call sync() method 
(async () => {  await db.sequelize.sync({force:false}); })();


// ENDED SYNC AND ROLE CREATION

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
