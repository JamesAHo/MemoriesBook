//const { models: { User,} } = require('../models/')
const { User,}  = require('../models/')
const bcrypt = require('bcrypt');
const db = require('../models');


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
const Signup = async ( req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.create({
        name: req.body.name,
        username:req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
    console.log("Successfully saved")
     res.redirect("/loggedin")
    } catch (error) {
        res.redirect("/register")
        console.log("not saved into database")
    }
    
}
// Log in Handle
const LoggedInPage = async( req, res) => {
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
{allUsers,UserForm,LoginPage, RegisterPage, Signup, LoggedInPage}