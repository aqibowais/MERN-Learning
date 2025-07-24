const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: String },
  gender: { type: String },
  job_title: { type: String },
},{timestamps:true});

//model
const User = mongoose.model("users", userSchema);

module.exports = User;