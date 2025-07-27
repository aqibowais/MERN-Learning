const {Router} = require("express")
const { handleSignUpUser, handleSignInUser } = require("../controllers/user")

const route = Router()




//views routes
route.get('/signin',(req,res)=>res.render('signin'))
route.get('/signup',(req,res)=>res.render('signup'))


//request routes
route.post("/signup",handleSignUpUser)
route.post("/signin",handleSignInUser)


module.exports = route