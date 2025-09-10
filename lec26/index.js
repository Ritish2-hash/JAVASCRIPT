const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("./model/user");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ------------------ Middleware ------------------
function verifyToken(req, res, next) {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];  // "Bearer <token>"

    if (!token) {
        return res.json({ success: false, message: "Token missing" });
    }

    jwt.verify(token, "jaishreeram", (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: "Invalid token" });
        }
        req.user_id = decoded.id;  // token se user id nikali
        next(); // req ko aage bhej diya
    });
}

// ------------------ Signup API ------------------
app.post("/api/users/signup", async (req, res) => {
    let { username, email, password } = req.body;

    let userExist = await User.findOne({ email: email });
    if (userExist) {
        return res.json({
            success: false,
            message: "Email already registered"
        });
    }

    let newUser = await User.create({
        username: username,
        email: email,
        password: password
    });

    res.json({
        success: true,
        message: "User registered successfully",
        user: newUser
    });
});

// ------------------ Login API ------------------
app.post("/api/auth/login", async (req, res) => {
    let { email, password } = req.body;

    let userExist = await User.findOne({ email: email });
    if (!userExist) {
        return res.json({ success: false, message: "Email not registered" });
    }

    if (userExist.password !== password) {
        return res.json({ success: false, message: "Incorrect password" });
    }

    // token banaya
    let token = jwt.sign({ id: userExist._id }, "jaishreeram", { expiresIn: "1h" });

    res.json({
        success: true,
        message: "Login successful",
        token: token
    });
});

// ------------------ Protected Route ------------------
app.get("/home", verifyToken, async (req, res) => {
    let userId = req.user_id; // token se nikala
    let user = await User.findById(userId); // DB se user nikala
    let username = user.username;

    res.send("Home page " + username);
});

// ------------------ DB + Server ------------------
mongoose.connect("mongodb://127.0.0.1:27017/lecture25")
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e.message));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
