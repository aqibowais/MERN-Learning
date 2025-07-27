const express = require("express")
const { handleUserSignIn,handleUserLogIn } = require("../controllers/user")

const route = express.Router()

route.post('/signup',handleUserSignIn)
route.post('/login',handleUserLogIn)

module.exports = route