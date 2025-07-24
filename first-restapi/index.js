const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const { json } = require("stream/consumers")

//create app
const app = express()
const PORT = 8000

//middlewear - plugin
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//creating api routes
app.get("/api/users",(req,res)=>{
   
    res.status(200  ).json(users)
})
app.get("/api/users/:id",(req,res)=>{
    const userId = Number(req.params.id)
    const user = users.find(user=>user.id===userId)
    if(!user){
        return res.status(404).json({error:"User not found"})
    }
    res.status(200).json(user)
})


//create user routes
// app.get("/users",(req,res)=>{
//     const html = `
//     <ul>
//         <li>
//             ${users.map(user=>user.first_name + " " + user.last_name).join("</li><li>")}
//         </li>
//     </ul>
//     `
//     res.status(200).send(html)
// })
app.post("/users/add",(req,res)=>{
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.gender || !req.body.job_title){
        return res.status(400).send("All fields are required")
    }
    // Check if user already exists
    const existingUser = users.find(user=>user.email===req.body.email) 
    if(existingUser){
        return res.status(400).send("User already exists")
    }
    const newUser = {
        id:users.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        job_title:req.body.job_title
    }
    users.push(newUser)
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2))
    return res.status(201).send("User created successfully")

})


//simplifying user route
app.route("/users/:id").get((req,res)=>{
    const userId = Number(req.params.id)
    const user = users.find(user=>user.id===userId)
    if(!user){
        return res.status(404).send("User not found")
    }
    const html = `
    <h1>${user.first_name} ${user.last_name}</h1>
    <p>Email: ${user.email}</p>
    `
    res.status(200).send(html)
}).delete((req,res)=>{
    const userId = Number(req.params.id)
    if(!users.some(user=>user.id===userId)) return res.status(404).send("User not found")
    const filteredUsers = users.filter(user=>user.id!==userId)
    // Save updated users to file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(filteredUsers, null, 2))
    return res.status(200).send("User deleted successfully")
})



// listen on port to start server
app.listen(PORT,(req,res)=>console.log(`Server started at port : ${PORT}`))