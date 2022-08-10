const { models: { User, Post} } = require('../models')
const bcrypt = require('bcrypt');





// PostHandler
const SavePost = async( req, res) => {
    try {
        const post =  await new Post(req.body)
         post.save(() => {
            // save data then redirect to main page
            
            
        })
        res.redirect("/")
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
        return res.render('posts-index', {posts})
    } catch (error) {
        console.log(error.message)
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
const RegisterHandle = async ( req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.create({
         
        name: req.body.name,
        username:req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
    
    console.log(req.body)
     res.redirect("/login")
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
// save user data
const saveUser = async( req, res) => {
    const {name, email, phone} = await req.body;
    const user = await User.create({
        name:name, email:email, phone:phone
    }).catch(error => console.log(error))
    console.log(user)
   res.redirect('/')
}




module.exports = 
{allUsers,UserForm,LoginPage, RegisterPage, RegisterHandle, LoggedInPage, checkNotAuthenticated, SavePost, CreatePost,FindPosts}