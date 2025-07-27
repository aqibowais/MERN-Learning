const User = require("../models/user");
const {v4:uuid} = require("uuid")
const {setUser} = require("../services/auth")

async function handleUserSignIn(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.redirect("/")
}

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if(!user) return res.render("login",{error:"Invalid email or password"})
  // const sessionId = uuid()
  // setUser(sessionId,user)

  const token = setUser(user)
  res.cookie("token",token)
  // return res.json({token}) //for mobile and multiple devices
  return res.redirect("/")
}

module.exports = {
    handleUserSignIn,
    handleUserLogIn,
}