const express = require("express");
const BlogModel = require("../models/blogs/blogs");
const blogRouter = express.Router();

blogRouter.get("/all", async (res, req) => {
  const blogs = await BlogModel.find().sort({ date: "desc" });
  req.render("blog/blogs", { blogs: blogs });
});

blogRouter.get("/new", (req, res) => {
  res.render("blog/create", { blog: new BlogModel() });
});

//editing
blogRouter.get("/edit/:id", async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  res.render("blog/edit", { blog: blog });
});

blogRouter.get("/:slug", async (req, res) => {
  let blog = await BlogModel.findOne({ slug: req.params.slug });
  res.render("blog/single_blog", { blog: blog });
});

blogRouter.post(
  "/",
  (req, res, next) => {
    req.blog = new BlogModel();
    next();
  },
  AcceptandEdit("/blogs/create")
);

blogRouter.put(
  "/:id",
  async (req, res, next) => {
    req.blog = await BlogModel.findById(req.params.id);
    next();
  },
  AcceptandEdit("/edit")
);

//common

function AcceptandEdit(path) {
  return async (req, res) => {
    let blog = req.blog;

    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.description = req.body.description;
    blog.content = req.body.content;
    try {
      blog = await blog.save();
      res.redirect("/blogs/" + blog.slug);
    } catch (e) {
      res.render(`blogs/${path}`, { blog: blog });
    }
  };
}

//deleting

blogRouter.delete("/:id", async (req, res) => {
  await BlogModel.findOneAndDelete(req.params.id);
  res.redirect("/blogs/all");
});

module.exports = blogRouter;
