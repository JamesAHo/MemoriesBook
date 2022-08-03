const express = require('express');
const router = express.Router();
const {allUsers, UserForm, saveUser, LoginPage} = require("../UserController")
router.get('/login', LoginPage)
router.get('/home', allUsers); // 1 page of html
router.get('/create', UserForm); // another html page
router.get('/', saveUser );// database from user

module.exports = router;