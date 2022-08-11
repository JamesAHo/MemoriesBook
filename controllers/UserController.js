require("dotenv").config();
const  { User, Post, Comment} = require('../models')

const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt');


require("dotenv").config();








// Comment on Post Handle
const PostComment = async (req, res, next) => {
    try {
        const comment = new Comment(req.body);
        comment.save().then(() => {
            Post.findByPk(req.params.postId)
        }).then((posts) => {
            posts.summary.unshift(comment);
            return posts.save()
        }).then(() => res.redirect("/posts/:postId") ) // back to main page

    } catch (error) {
        console.log(error)
    }
    
}

// PostHandler
const SavePost = async( req, res) => {
    try {
        const post =  await new Post(req.body)
         post.save(() => {
            // save data then redirect to main page
            return res.render("/posts/index");
            
            
        })
        res.redirect("/posts/index")
    } catch (error) {
        

        console.log("not saved")

    }
}
const CreatePost =  async (req, res) =>{

    await res.render("posts-new")
}
const FindPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({raw:true});
       
        // lead to page that shows all user's posts
        return res.render('posts-index', {posts})
    } catch (error) {
        return console.log(error.message)
    }
}
// Single User's Post
const UserPostPage = async (req, res) =>{
    try {
        const posts = await Post.findByPk((req.params.postId),{raw:true});
        return res.render('posts-show', {posts})
    } catch (error) {
        return console.log(error.message)
    }
}

const allUsers =  async( req, res) => {
    await res.render('home')
}
const UserForm =  async( req, res) => {
    await res.render('create')
}
const LoginPage =  async( req, res) => {
    if(req.session.logged_in) {
        res.render("home")
    } else {
        res.render('login')
    }
    
}
// Register
const RegisterPage = async( req, res) => {
    await res.render('register')
}
// RegisterHandle
const RegisterHandle = async ( req, res) =>   {
    try {
        const user = new User(req.body);
        
    user.save({
         
        name: req.body.name,
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

   
    return  res.redirect("/login")
    } catch (error) {
        res.redirect("/register")
        console.log("not saved into database")
    }
    
}
// Auth
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }





// Log in Handle
const LoggedInPage = async( req, res) => {
    // do query
    await res.render("loggedin")
}

const LoginVerification =  async (req, res ) => {
    
    try {
      const userData = await User.findOne({ where: { email: req.body.email } },
        { attributes: ["name"] });
      
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      // validate password
      const validatePassword = await userData.checkPassword(req.body.password);
      
      if (!validatePassword) {
        
        res.status(400).json({messasage:"invalid password"});
        return;
      }
    //   req.session.save(() => {
    //     req.session.user_id = userData.id;
    //     req.session.logged_in = true;
        
    //     res.json({ user: userData, message: 'You are now logged in!' });
    //   })
      
      res.render("loggedin")
    } catch (err) {
      res.status(400).json(err);
    }
  };



// 
const LogOut = async (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() =>{
            res.status(204).end()
        })
    }
    
    return res.redirect('/login');
}



module.exports = 
{LogOut,allUsers,UserForm,LoginPage, RegisterPage, RegisterHandle, LoggedInPage, checkNotAuthenticated, SavePost, CreatePost,FindPosts,UserPostPage, LoginVerification,  PostComment}