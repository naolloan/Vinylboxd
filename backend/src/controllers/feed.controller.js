const { ActivityFeed, User } = require("../models");

exports.getFeed = async (req, res, next) => {
  try {
    const items = await ActivityFeed.findAll({
      include: [{ model: User, attributes: ["id","username","avatarUrl"] }],
      order: [["createdAt","DESC"]],
      limit: 100
    });
    res.json(items);
  } catch (err) { next(err); }
};
