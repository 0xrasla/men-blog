const mongoose = require("mongoose");
const slugify = require("slugify");

const Blog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

Blog.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }

  next();
});

module.exports = mongoose.model("Blogs", Blog);
