const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogs",
    },
    content:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

},{timestamps:true})

const Comment = mongoose.model("comments",commentSchema)

module.exports = Comment