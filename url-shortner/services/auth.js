const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const secret = process.env.JWT_SECRET;
// the map is for statefull authentication to keep the track of user on the server,
// now we will use jwt to make it stateless,as in statefull the sessionid get invalid when server get restarted
// const sessionIdToUserMap = new Map()

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role:user.role,
    },
    secret
  );
}

function getUser(token) {
  // return sessionIdToUserMap.get(id)
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
