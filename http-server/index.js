const express = require("express")
const moongoose = required("moongoose")

const app = express()
const PORT = process.env.PORT || 8000

//connecting to MongoDB





app.listen(PORT || 8000,()=>console.log("Server is running on port 8000"))