const mongoose = require("mongoose")
const {createHmac, randomBytes} = require("crypto")
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:'/images/defaultProfileImage.png'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"

    }
},{timestamps:true})


userSchema.pre("save",function(next){
    const user = this
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest('hex')

    this.salt = salt
    this.password = hashedPassword

    next()
})

userSchema.static("matchPassword",async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error("User not found!")
    
    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHashedPassword = createHmac("sha256",salt).update(password).digest("hex")
    console.log(userProvidedHashedPassword)
    if(hashedPassword!==userProvidedHashedPassword) throw new Error("Incorrect password!")
    return user
})


const User = mongoose.model("users",userSchema)

module.exports = User