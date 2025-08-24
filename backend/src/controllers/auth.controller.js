import { User } from "../models/index.js";
import { sign } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

const authCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({ username, email, password: hashed });

      return res.json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

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
  }
};

export default authCtrl;
