const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new mongoose.Schema({
  title:String,
  content: { type: String, require: true },
  
  date: 
  { 
    type: Date, 
    default: Date.now
},

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  }
});

const BlogModel = mongoose.model("Blog", blogSchema);
module.exports = BlogModel;
