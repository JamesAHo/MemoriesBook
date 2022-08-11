const { application } = require('express');
const express = require('express');
const router = express.Router();
const {User, Post} = require("../../models");


const withAuth = require("../../utils/Auth");



const {LogOut,allUsers, UserForm, RegisterHandle, LoginPage, RegisterPage, LoggedInPage, PostComment, SavePost, CreatePost, FindPosts,UserPostPage, LoginVerification} = require("../UserController")

//Home Page that User can see page content but can not participate unless logged in
router.get("/", async (req, res) => {
  
    try {
      
      // lead to page that shows all user's posts
      res.render('home')
      return;

  } catch (error) {
      res.status(404).send(error.message);
  }
}) //Home Page that User can see page content but can not participate unless logged in
// Create posts



router.get("/posts/new", CreatePost)
router.post("/posts/new", SavePost)
// View all posts
router.get("/posts/index", FindPosts);
// View Specific single user posts
router.get("/posts/:postId",UserPostPage)


// Login Handle
router.get('/login', LoginPage);

router.post('/login',LoginVerification )   // Missing Post method to log in
router.get("/loggedin", LoggedInPage)
// LogOUT Handle
router.get("/logout",LogOut )





//RegisterPage handle
router.get("/register", RegisterPage); //
router.post("/register", RegisterHandle )




// Comment Routes
router.post("/posts/:postId/comments", PostComment)


// logout

// router.post('/logout', (req, res) => {
//     if (req.session.logged_in) {
//       req.session.destroy(() => {
//         res.status(204).end();
//       });
//       return res.redirect('/login');
//     } else {
//       res.status(404).end();
//     }
//   });



module.exports = router;