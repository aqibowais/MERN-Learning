//creating a basic logging file using custom http server 
const http = require("http")
const fs = require("fs")
const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()} : New Request recieved\n`
    fs.appendFile("log.txt",log,(err,data)=>{
        switch (req.url){
            case "/":
                res.end("Welcome to the server")
            case "/home":
                res.end("Welcome to home screen")
            case "/about":
                res.end("Hi! I am Aqib")
            default:
                res.end("Welcome to the server")

            }
    })
})

myServer.listen(8000,(req,res)=>console.log("server created"))