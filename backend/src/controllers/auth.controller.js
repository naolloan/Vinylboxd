const { User } = require("../models");
const { hashPassword, comparePassword } = require("../utils/hash");
const { sign } = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "username, email, password required" });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await hashPassword(password);
    const user = await User.create({ username, email, passwordHash });
    const token = sign({ id: user.id });

    res.status(201).json({ token, user: { id: user.id, username, email } });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password)
      return res.status(400).json({ message: "emailOrUsername and password required" });

    const user = await User.findOne({
      where: emailOrUsername.includes("@") ? { email: emailOrUsername } : { username: emailOrUsername }
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = sign({ id: user.id });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ["id","username","email","bio","avatarUrl","createdAt"] });
    res.json(user);
  } catch (err) { next(err); }
};
