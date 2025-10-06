const express = require("express");
const router = express.Router();  

const { postLogin } = require("../controllers/authController");


router.post("/login", postLogin);

module.exports = router;
