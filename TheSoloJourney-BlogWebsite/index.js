const express = require("express")
const dotenv = require("dotenv").config()
const path = require("path")
const userRoutes = require("./routes/user")
const { connectToMongo } = require("./connection")

const port = process.env.PORT
const mongoUrl = process.env.MONGODBURL

const app = express()


connectToMongo(mongoUrl)

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    return res.render("home")
})

app.use("/user",userRoutes)

app.listen(port,()=>console.log(`Server is running on PORT : ${port}`))