const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Blog", blogSchema);
