const mongoose = require("mongoose");
const user = require("./user");

const blogSchema = new mongoose.Schema({
  title: String,
  content: {
    type: String,
    required: true   // must have content
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",  // mapping to User model
    require: true
  }
});

module.exports = mongoose.model("Blog", blogSchema);
