const { Review, ActivityFeed, User } = require("../models");

exports.createReview = async (req, res, next) => {
  try {
    const { targetType, targetId, rating, reviewText } = req.body;
    if (!targetType || !targetId || rating == null)
      return res.status(400).json({ message: "targetType, targetId, rating required" });

    const review = await Review.create({
      userId: req.user.id, targetType, targetId, rating, reviewText
    });

    await ActivityFeed.create({
      userId: req.user.id,
      actionType: "reviewed",
      subjectType: "review",
      subjectId: review.id,
      metadata: { targetType, targetId, rating }
    });

    res.status(201).json(review);
  } catch (err) { next(err); }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const { rating, reviewText } = req.body;
    if (rating != null) review.rating = rating;
    if (reviewText != null) review.reviewText = reviewText;
    await review.save();
    res.json(review);
  } catch (err) { next(err); }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await review.destroy();
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
};

exports.getReviewsForTarget = async (req, res, next) => {
  try {
    const { targetType, targetId } = req.params;
    const reviews = await Review.findAll({
      where: { targetType, targetId },
      include: [{ model: User, attributes: ["id","username","avatarUrl"] }],
      order: [["createdAt","DESC"]]
    });
    res.json(reviews);
  } catch (err) { next(err); }
};

exports.getUserReviews = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.findAll({
      where: { userId },
      order: [["createdAt","DESC"]]
    });
    res.json(reviews);
  } catch (err) { next(err); }
};
