const Blog = require("../models/blog");
const Comment = require("../models/comment");

async function handleAddBlog(req, res) {
  const { title, body } = req.body;
  console.log("user id while creating the blog is",req.user.id)
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user.id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  console.log(blog);
  return res.redirect("/");
}

async function handelGetBlog(req, res) {
  const id = req.params.id
  const blog = await Blog.findById(id).populate("createdBy").exec();
  const comments = await Comment.find({blogId:id}).populate("createdBy").sort({createdAt: -1}).exec();

  console.log(blog);
  console.log("comments are ",comments);
  return res.render("blog", {
    user:req.user,
    blog,
    comments,
  });
}

async function handleDeleteBlog(req,res){
  const id = req.params.id
  const result = await Blog.deleteOne(id)
  return res.redirect("/",{
    user:req.user
  })
}

module.exports = {
  handleAddBlog,
  handelGetBlog,
  handleDeleteBlog,
};
