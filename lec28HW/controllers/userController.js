const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";


module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  let exist = await User.findOne({ email });
  if (exist) return res.json({ success: false, message: "User already exists" });

  const user = new User({ username, email, password });
  await user.save();

  res.json({ success: true, message: "User created", data: user });
};


module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  if (user.password !== password) {
    return res.json({ success: false, message: "Wrong password" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({
    success: true,
    message: "Login success",
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
};
