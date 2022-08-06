const { application } = require('express');
const express = require('express');
const router = express.Router();
const passport = require("passport");
const Post = require('../../models/Post');




const {allUsers, UserForm, RegisterHandle, LoginPage, RegisterPage, LoggedInPage, checkNotAuthenticated, SavePost, CreatePost, FindPosts} = require("../UserController")

router.get("/",(req, res) => {
    res.json({message: "welcome to page"})
})
// Create posts
router.get("/posts/new", CreatePost)
router.post("/posts/new", SavePost)
// View all posts
router.get("/posts/index", FindPosts);


// Login Handle
router.get('/login', LoginPage)
router.post('/login',) // Missing Post method to log in

//HomePage
router.get('/home', allUsers); 
router.get('/create', UserForm);

//RegisterPage handle
router.get("/register", RegisterPage); //
router.post("/register", RegisterHandle )


//LoggedInPage
router.get("/loggedin", LoggedInPage)


// logout





module.exports = router;