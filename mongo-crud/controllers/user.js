const User = require('../models/user')


async function handleGetAllUser(req,res){
    const allUsers = await User.find({})
    res.status(200).json(allUsers)
}
async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id)
    if(!user)return res.send("No user found")
    res.status(200).send(user)
}
async function handleCreateUser(req,res){
     if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.gender || !req.body.job_title){
        return res.status(400).send("All fields are required")
    }
    
    const newUser = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        job_title:req.body.job_title
    }
    const result =await User.create(newUser)
    console.log(result)
    return res.status(201).json({message:"User created successfully"})
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg:"success"})
}
module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handleDeleteUserById,
    handleCreateUser
}