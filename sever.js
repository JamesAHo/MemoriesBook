require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./controllers/routes/index");
const exphbs = require('express-handlebars');
const sequelize = require("./config/connection");
//const db = require("./models")
//const bodyParser = require('body-parser');



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
(async () => {  await sequelize.sync({force:false}); })();


// ENDED SYNC AND ROLE CREATION
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
