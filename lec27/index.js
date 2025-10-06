const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("../models/user");


const userRoutes = require("./routes/userroutes");
const authRoutes = require("./routes/authroutes");
const blogRoutes = require("./routes/blogroutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend from public folder
app.use(express.static(path.join(__dirname, "public")));

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/lec27")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log(err.message));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);


// Test
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
