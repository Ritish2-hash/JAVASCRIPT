const express = require("express");
const app = express();
const mongoose = require("mongoose");
const BlogModel = require("./model/blogs"); // import model

mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err.message));

app.use(express.static(__dirname + "/public"));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server running ok"
  });
});

app.listen(3323, () => {
  console.log("server started");
});


function addBlog() {
  let blog = {
    title: "first blog",
    author: "ritish",
    body: "first blog content",
    date: new Date()
  };

  let newBlog = new BlogModel(blog);
  newBlog.save()
    .then(() => console.log("Blog added successfully"))
    .catch(err => console.log(err));
}

addBlog();
