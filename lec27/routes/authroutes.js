const express= require("express");
const User = require("../models/user");

const router= express()
let {postLogin}=require("../controllers/authcontroller")
router.post("/login",postLogin)





module.exports=router;