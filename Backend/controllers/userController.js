const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/* REGISTER */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = new User({ name, email, mobile, password });
    await user.save();

    res.status(201).json({ message: "Account created" });

  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

/* LOGIN + JWT */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // 🔐 TOKEN GENERATE
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login success",
      token,
      userId: user._id
    });

  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

/* PROTECTED USER DATA */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};