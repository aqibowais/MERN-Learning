const {Router} = require("express")
const { handleAddBlog, handelGetBlog,handleDeleteBlog } = require("../controllers/blog")
const multer = require("multer")
const path = require('path')
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const route = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads/'))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

//views routes
route.get('/add-new',(req,res)=>res.render('addBLog',{
    user:req.user
}))

route.post('/',upload.single("coverImageUrl"),handleAddBlog)

route.get('/:id',handelGetBlog)

route.post('/comment/:blogId',async(req,res)=>{
    console.log(req.body)
    await Comment.create({
        blogId:req.params.blogId,
        content:req.body.content,
        createdBy:req.user.id,
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})
// route.delete('/delete/:id',handleDeleteBlog)

module.exports = route