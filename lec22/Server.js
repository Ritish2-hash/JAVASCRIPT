const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const Blog = require("./model/blogs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 JWT Verify Middleware
function verifyToken(req, res, next) {
  let token = req.headers.authorization; // should come as: Bearer <token>
  if (!token) {
    return res.json({ success: false, message: "Token required" });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    let decode = jwt.verify(token, "hehehe"); // secret key
    req.user_id = decode.id;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Invalid token" });
  }
}

// 🔹 Protected Route Example
app.get("/home", verifyToken, async (req, res) => {
  let userId = req.user_id;
  let user = await User.findById(userId);
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }
  res.send("Home page " + user.username);
});

// 🔹 Signup
app.post("/api/users/signup", async (req, res) => {
  let { username, email, password } = req.body;

  let userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.json({
      success: false,
      message: "User already exists with this email, directly login",
    });
  }

  let newUser = await User.create({
    username: username,
    email: email,
    password: password,
  });

  res.json({ success: true, message: "New user created", user: newUser });
});

// 🔹 Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  let userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.json({
      success: false,
      message: "Email not registered, please signup",
    });
  }

  if (userExist.password != password) {
    return res.json({ success: false, message: "Incorrect password" });
  }

  let token = jwt.sign({ id: userExist._id }, "hehehe", { expiresIn: "1h" });

  res.json({
    success: true,
    message: "Login successfully",
    token: token,
  });
});

// 🔹 Add Blog (Protected)
app.post("/api/blogs/add", verifyToken, async (req, res) => {
  try {
    let { title, content } = req.body;

    let blog = await Blog.create({
      title,
      content,
      userId: req.user_id, // ✅ take from token
    });

    // push blog to user's blogs array
    await User.findByIdAndUpdate(req.user_id, {
      $push: { blogs: blog._id },
    });

    res.json({
      success: true,
      message: "Blog created successfully",
      blog: blog,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 🔹 Get Blogs (Public)
app.get("/api/blogs", async (req, res) => {
  let blogs = await Blog.find().populate("userId", "username email");
  res.json(blogs);
});

// 🔹 Start Server
app.listen(5656, () => {
  console.log("server started at http://localhost:5656");
});

// 🔹 Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/jwt_demo")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));