const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  //using cookies
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const user = getUser(tokenCookie);
  req.user = user;
  return next();

  //using headers
  // const authorizationHeaderValue = req.headers["authorization"]
  // req.user = null
  // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
  //     return next()

  // const token = authorizationHeaderValue.split("Bearer ")[1]
  // const user = getUser(token)
  // req.user = user
  // return next()
}

function restrictTo(roles= []) {
  return function (req, res, next) {
    if(!req.user) return res.redirect("login")

    if(!roles.includes(req.user.role)) return res.end("UnAuthorized")
    return next()
  };
}

// function restrictToLoggedInUserOnly(req,res,next){
//     const userUid = req.cookies.uid
//     // const userUid = req.headers["authorization"]
//     if(!userUid) return res.redirect('/login')
//     // const token = userUid.split("Bearer ")[1]
//     const user = getUser(userUid)
//     console.log(user)
//     if(!user) return res.redirect('/login')
//     req.user = user

//     next()
// }

// function checkAuth(req,res,next){
//     const userUid = req.cookies.uid
//     // const userUid = req.headers["authorization"]?.split("Bearer ")[1]
//     const user = getUser(userUid)
//     console.log(user)
//     req.user = user

//     next()
// }

module.exports = {
  checkForAuthentication,
  restrictTo,
  // restrictToLoggedInUserOnly,
  // checkAuth,
};
