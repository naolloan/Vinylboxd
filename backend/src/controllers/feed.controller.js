const { Review, List, User } = require("../models");

exports.getFeed = async (req, res) => {
  try {
    // Get latest reviews and lists
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

    // Merge and sort by date
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
};
