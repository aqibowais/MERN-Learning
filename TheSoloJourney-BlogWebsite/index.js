const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/user")
const blogRoutes = require('./routes/blog')
const { connectToMongo } = require("./connection")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")
const Blog = require("./models/blog")

const port = process.env.PORT
const mongoUrl = process.env.MONGODBURL

const app = express()


connectToMongo(mongoUrl)

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))
app.get("/",async(req,res)=>{
    if(!req.user) res.render('home')
    const allBlogs = await Blog.find({createdBy:req.user.id})
    return res.render("home",{
        user:req.user,
        allBlogs,
    })
})

app.use("/user",userRoutes)
app.use("/blog",blogRoutes)

app.listen(port,()=>console.log(`Server is running on PORT : ${port}`))
