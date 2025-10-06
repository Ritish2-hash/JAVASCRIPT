const Blog = require("../model/blog");

module.exports.getMyBlogs = async (req, res) => {
    let userId = req.userId;
    let myBlogs = await Blog.find({ userId: userId });
    res.json({
        success: true,
        message: "my blogs fetched successfully",
        data: myBlogs
    });
};