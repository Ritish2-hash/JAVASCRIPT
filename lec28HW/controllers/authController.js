const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please sign up."
            });
        }

        // Direct password check (no hashing, simple match)
        if (userExist.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const payload = { userId: userExist._id };

        // Using a simple secret key (no .env)
        const token = jwt.sign(payload, "mysecretkey", { expiresIn: "1h" });

        res.json({
            success: true,
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};
