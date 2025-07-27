const express = require("express")
const dotenv = require("dotenv").config()
const ejs = require("ejs")
const path = require("path")
const cookieParser = require("cookie-parser")


const {connectToMongo} = require("./connection")

const urlRoutes  = require("./routes/url")
const staticRoute = require("./routes/static_route")
const userRoute = require('./routes/user')
const { checkForAuthentication,restrictTo } = require("./middlewares/auth")

const mongoDbUrl = process.env.MONGODBURL
const PORT = process.env.PORT || 5000

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)

//server side rendering configs
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

//connect to mongo db
connectToMongo(mongoDbUrl)

app.use("/url",restrictTo("NORMAL"),urlRoutes)
app.use("/user",userRoute)
app.use("/",staticRoute)



app.listen(PORT,()=>console.log(`Server is running on Port : ${PORT}`))