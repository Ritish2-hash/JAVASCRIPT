const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, 
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }]
});

module.exports = mongoose.model("User", userSchema);
