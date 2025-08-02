const User = require("../models/user");

async function handleSignUpUser(req, res) {
  const { fullname, email, password } = req.body;
  await User.create({
    fullname,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleSignInUser(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin",{
      error:"Incorrect Email or Password"
    })
  }
}

function handleUserLogout(req,res){
  res.clearCookie("token").redirect("/")
}

module.exports = {
  handleSignUpUser,
  handleSignInUser,
  handleUserLogout,
};
