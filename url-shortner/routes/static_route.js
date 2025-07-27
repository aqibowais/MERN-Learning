const express = require("express")
const { handleGetUserAllUrls } = require("../controllers/url")
const { restrictTo } = require("../middlewares/auth")
const URL = require("../models/url")
const User = require("../models/user")

const route = express.Router()

route.get('/',restrictTo(["NORMAL","ADMIN"]),handleGetUserAllUrls)

route.get("/admin/urls",restrictTo(["ADMIN"]),async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home",{
        allUrls:allUrls,
        role:"ADMIN",
        users:User.find({})

    })
})

route.get('/signup',(req,res)=>res.render("signup"))
route.get('/login',(req,res)=>res.render("login"))


module.exports = route