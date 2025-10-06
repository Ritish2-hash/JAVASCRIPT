const express = require("express");
const router = express();
const { isLogin } = require("../middleware/auth");
const { getMyBlogs } = require("../controller/myblogController");

router.get("/", isLogin, getMyBlogs);

module.exports = router;