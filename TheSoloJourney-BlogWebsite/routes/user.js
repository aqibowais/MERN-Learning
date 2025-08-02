const {Router} = require("express")
const { handleSignUpUser, handleSignInUser, handleUserLogout } = require("../controllers/user")

const route = Router()




//views routes
route.get('/signin',(req,res)=>res.render('signin'))
route.get('/signup',(req,res)=>res.render('signup'))


//request routes
route.post("/signup",handleSignUpUser)
route.post("/signin",handleSignInUser)
route.get("/logout",handleUserLogout)


module.exports = route