const User = require('../models/User');

const allUsers =  async( req, res) => {
    await res.render('home')
}
const UserForm =  async( req, res) => {
    await res.render('create')
}
const LoginPage =  async( req, res) => {
    await res.render('login')
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
{allUsers,UserForm,saveUser, LoginPage
}