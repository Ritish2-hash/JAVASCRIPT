const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/blogapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
