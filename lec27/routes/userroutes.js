const express= require("express");
const router= express();
const {postAddUser,getAllUsers}= require("../controllers/usercontroller")
router.post("/",postAddUser)
router.get("/",getAllUsers)


module.exports=router;