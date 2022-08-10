const { application } = require('express');
const express = require('express');
const router = express.Router();


const {allUsers, UserForm, Signup, LoginPage, RegisterPage, LoggedInPage} = require("../UserController")
router.get("/",(req, res) =>{
    res.json({message:"Welcome to application"});
})
// Login Handle
router.get('/login', LoginPage)
router.post('/login',(req, res) =>{
    res.json({message:"This is the page the user will be presented with after log in!!!"});
}) 
 // Missing Post method to log in

//HomePage
router.get('/home', allUsers); 
router.get('/create', UserForm);

//RegisterPage handle
router.get("/register", RegisterPage); //
router.post("/register", Signup )
//LoggedInPage
router.get("/loggedin", LoggedInPage)


module.exports = router;