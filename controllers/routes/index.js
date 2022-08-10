const { application } = require('express');
const express = require('express');
const router = express.Router();
const passport = require("passport");
const Post = require('../../models/Post');
const withAuth = require("../../utils/Auth");



const {LogOut,allUsers,HomepageHandle, UserForm, RegisterHandle, LoginPage, RegisterPage, LoggedInPage, PostComment, SavePost, CreatePost, FindPosts,UserPostPage, LoginVerification} = require("../UserController")

router.get("/") //Home Page that User can see page content but can not participate unless logged in
// Create posts
router.get("/posts/new", CreatePost)
router.post("/posts/new", SavePost)
// View all posts
router.get("/posts/index", FindPosts);
// View Specific single user posts
router.get("/posts/:id",UserPostPage)


// Login Handle
router.get('/login', LoginPage)

router.post('/login',LoginVerification,(req, res) =>{
  console.log("erro")
  res.send(req.session.logged_in)
})   // Missing Post method to log in
// LogOUT Handle
router.get("/logout",LogOut )


//HomePage
router.get('/home', allUsers); 
router.get('/create', UserForm);

//RegisterPage handle
router.get("/register", RegisterPage); //
router.post("/register", RegisterHandle )


//LoggedInPage (MIGHT DELETE)
router.get("/loggedin", LoggedInPage)

// Comment Routes
router.post("/posts/:id/comments", PostComment)


// logout

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
      return res.redirect('/login');
    } else {
      res.status(404).end();
    }
  });



module.exports = router;