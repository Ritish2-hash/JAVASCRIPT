const express = require("express");
const mongoose = require('mongoose');
const app = express();
const userRouter= require("./routes/userRoutes")
const blogRouter= require("./routes/blogRoutes");
const authRouter= require("./routes/authRoutes")
const myblogRouter= require("./routes/myblogRoutes")
const jwt=require("jsonwebtoken")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
//middleware to verify jwt token
app.use("/api/users",userRouter)
app.use("/api/blogs",blogRouter)
app.use("/api/auth",authRouter)
app.use("/api/myblog",myblogRouter)

mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));
app.listen(5556,()=>{
    console.log("server started")
})