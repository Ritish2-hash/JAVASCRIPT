const Blog = require("../models/blog");

module.exports.addBlog = async (req, res) => {
  const { title, content } = req.body;

  const newBlog = new Blog({ title, content, userId: req.userId });
  await newBlog.save();

  res.json({ success: true, message: "Blog added", data: newBlog });
};


module.exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("userId", "username");
  res.json({ success: true, data: blogs });
};


module.exports.getMyBlogs = async (req, res) => {
  const blogs = await Blog.find({ userId: req.userId }).sort({ date: -1 });
  res.json({ success: true, data: blogs });
};
