const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const cookieValue = req.cookies[cookieName]
        if(!cookieValue) return next()
        // console.log(cookieValue)

        try{
            const payload = validateToken(cookieValue)
            // console.log(payload)
            req.user = payload
        }catch(e){}
        return next()
    }
}

module.exports = {
    checkForAuthenticationCookie
}