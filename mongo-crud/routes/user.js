const express = require("express");
const User = require("../models/user");
const { handleGetAllUser, handleGetUserById, handleDeleteUserById, handleCreateUser } = require("../controllers/user");
const router = express.Router();

router.get("/",handleGetAllUser)


router.route("/:id").get(handleGetUserById).delete(handleDeleteUserById)

router.post("/",handleCreateUser)

// app.get("/users",async(req,res)=>{
//     const allUsers = await User.find({})
//     if(allUsers.length==0) res.status(200).send("No Users found")
//     const html = `<ul>
//         ${allUsers.map((user)=>`<li>${user.first_name} - ${user.email}</li>`).join("")}
//     </ul>`
//     res.status(200).send(html)
// })


module.exports = router;