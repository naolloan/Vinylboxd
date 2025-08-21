const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviews.controller");
const auth = require("../middleware/auth.middleware");

// Create review
router.post("/", auth, ctrl.createReview);

// Get reviews for a target (album, song, or artist)
router.get("/:targetType/:targetId", ctrl.getReviews);

// Delete review
router.delete("/:reviewId", auth, ctrl.deleteReview);

module.exports = router;
