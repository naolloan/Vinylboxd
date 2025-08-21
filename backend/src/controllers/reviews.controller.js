const { Review } = require("../models");

exports.createReview = async (req, res) => {
  try {
    const { content, rating, targetType, targetId } = req.body;

    if (!content || !rating || !targetType || !targetId) {
      return res.status(400).json({
        message: "content, rating, targetType, and targetId are required",
      });
    }

    const review = await Review.create({
      content,
      rating,
      targetType, // "album", "song", or "artist"
      targetId,   // UUID of the target
      userId: req.user.id,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create review",
      error: err.message,
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { targetType, targetId } = req.params;

    const reviews = await Review.findAll({
      where: { targetType, targetId },
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: err.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.destroy({
      where: {
        id: req.params.reviewId,
        userId: req.user.id,
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Review not found or not yours" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete review",
      error: err.message,
    });
  }
};
