const express = require('express');
const mongoose = require('mongoose');
const User = require("./model/user");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Signup route
app.post("/api/users/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.json({
                success: false,
                message: "User already exists"
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

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Login route
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.json({
                success: false,
                message: "Email not registered"
            });
        }

        if (userExist.password !== password) {
            return res.json({
                success: false,
                message: "Incorrect password"
            });
        }

        res.json({
            success: true,
            message: "Login successful",
            user: userExist
        });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/lecture25")
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e.message));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
