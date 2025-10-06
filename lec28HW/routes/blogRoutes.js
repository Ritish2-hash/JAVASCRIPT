const express = require("express");
const { addBlog, getAllBlogs, getMyBlogs } = require("../controllers/blogController");
const isLogin = require("../middleware/auth");

const router = express.Router();


router.get("/myblogs", isLogin, getMyBlogs);
router.get("/", getAllBlogs);
router.post("/", isLogin, addBlog);

module.exports = router;
