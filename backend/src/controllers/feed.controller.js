import { Review, List, User } from "../models/index.js";

const feedCtrl = {
  getFeed: async (req, res) => {
    try {
      const reviews = await Review.findAll({
        include: [{ model: User, attributes: ["id", "username"] }],
        order: [["createdAt", "DESC"]],
        limit: 10,
      });

      const lists = await List.findAll({
        include: [{ model: User, attributes: ["id", "username"] }],
        order: [["createdAt", "DESC"]],
        limit: 10,
      });

      const feed = [...reviews, ...lists].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      res.json(feed);
    } catch (err) {
      res.status(500).json({
        message: "Failed to load feed",
        error: err.message,
      });
    }
  }
};

export default feedCtrl;
