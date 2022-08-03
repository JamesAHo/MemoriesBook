require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./controllers/api/index");
const exphbs = require('express-handlebars');

// PORT set up.

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine('hbs', exphbs.engine({extname:'.hbs'}));
app.set("view engine", "hbs");
app.use("/", router);

// Creating routes 

app.get("/user", (req, res) => {
    res.render("home");
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

