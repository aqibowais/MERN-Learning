const User = require("../models/user");

async function handleSignUpUser(req, res) {
  const { fullname, email, password } = req.body;
  await User.create({
    fullname,
    email,
    password,
  });
  return res.redirect('/')
}

async function handleSignInUser(req, res) {
  const { email, password } = req.body;
  const user = await User.matchPassword(email,password)
  if(!user) return res.render("signin")
  console.log(user)
  return res.redirect('/')
} 


module.exports = {
    handleSignUpUser,
    handleSignInUser,
}