const { User } = require("../models");
const { sign } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ username, email, password: hashed });

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    // Sign JWT
    const token = sign({ id: user.id });

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
