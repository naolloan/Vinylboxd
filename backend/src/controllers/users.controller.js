const { User, Follower } = require("../models");

exports.getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
      attributes: ["id","username","email","bio","avatarUrl","createdAt"]
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const followers = await Follower.count({ where: { followingId: user.id } });
    const following = await Follower.count({ where: { followerId: user.id } });

    res.json({ ...user.toJSON(), counts: { followers, following } });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { bio, avatarUrl } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bio = bio ?? user.bio;
    user.avatarUrl = avatarUrl ?? user.avatarUrl;
    await user.save();
    res.json({ message: "Updated", user });
  } catch (err) { next(err); }
};

exports.follow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId === req.user.id) return res.status(400).json({ message: "Cannot follow yourself" });

    await Follower.findOrCreate({ where: { followerId: req.user.id, followingId: userId } });
    res.json({ message: "Following" });
  } catch (err) { next(err); }
};

exports.unfollow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await Follower.destroy({ where: { followerId: req.user.id, followingId: userId } });
    res.json({ message: "Unfollowed" });
  } catch (err) { next(err); }
};
