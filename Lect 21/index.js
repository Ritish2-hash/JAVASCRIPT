const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user");  // import User model

const app = express();
app.use(express.json());
app.get("/health",(req,res)=>{
  console.log("aaaaaaaaaaaaaaaaaaa")
  res.json({
    status:"ok"
  })
})
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err.message));

// API: Add User
app.post("/adduser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already registered"
      });
    }

    // create new user
    await User.create({
      name: name,
      email: email,
      password: password
    });

    res.json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Start server
app.listen(3223, () => {
  console.log("Server running on port 3223");
});


app.get("/users", async (req, res) => {
  try {
    let allusers = await User.find();  // fetch all users
    res.json({
      success: true,
      data: allusers
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
});
