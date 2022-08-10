
require("dotenv").config();
const  { User, Post, Comment} = require('../models')


const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt');
const { request } = require("express");

require("dotenv").config();


// const connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : process.env.DB_PASSWORD,
// 	database : process.env.DB_NAME
// });




// Comment on Post Handle
const PostComment = async (req, res, next) => {
    try {
        const comment = new Comment(req.body);
        comment.save().then(() => {
            Post.findbyId(req.params.id)
        }).then((posts) => {
            posts.comments.unshift(comment);
            return posts.save()
        }).then(() => res.redirect("/") )

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
        const posts = await Post.findByPk((req.params.id),{raw:true});
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
    await res.render('login')
}
// Register
const RegisterPage = async( req, res) => {
    await res.render('register')
}
// RegisterHandle
const RegisterHandle = async ( req, res) =>   {
    try {
        const user = new User(req.body);
        // const hashedPassword = bcrypt.hash(req.body.password);
    user.save({
         
        name: req.body.name,
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then((user) => {
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn:"60 days"});
        res.cookie('nToken', token, {maxAge: 600000, httpOnly: true})
        console.log(req.body)
        return  res.redirect("/login")
    })

   
     
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

const LoginVerification =  async (req, res) => {
    
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      console.log("checkPassword",userData.checkPassword)
      const validPassword = await userData.checkPassword(req.body.password);
      console.log(validPassword)
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  };



// HomepageHandle
const HomepageHandle = async (req, res) => {
    
}

const LogOut = async (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/login');
}



module.exports = 
{LogOut,allUsers,UserForm,LoginPage, RegisterPage, RegisterHandle, LoggedInPage, checkNotAuthenticated, SavePost, CreatePost,FindPosts,UserPostPage, LoginVerification, HomepageHandle, PostComment}