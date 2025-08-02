const JWT = require("jsonwebtoken")
const dotenv = require("dotenv").config


const secret = process.env.JWT_SECRET

function generateTokenForUser(user){
    const payload = {
        id:user._id,
        fullname:user.fullname,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role,
    }

    const token = JWT.sign(payload,secret)
    return token
}

function validateToken(token){
    const payload = JWT.verify(token,secret)
    return payload
}

module.exports = {
    generateTokenForUser,
    validateToken,
}