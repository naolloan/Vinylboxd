const { ActivityFeed, User } = require("../models");

// Get activity feed for the logged-in user
exports.getFeed = async (req, res) => {
  try {
    const feed = await ActivityFeed.findAll({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: ["id", "username"] }],
      order: [["createdAt", "DESC"]],
    });

    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activity feed", error: err.message });
  }
};
