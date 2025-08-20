const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviews.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, ctrl.createReview);
router.put("/:reviewId", auth, ctrl.updateReview);
router.delete("/:reviewId", auth, ctrl.deleteReview);

router.get("/target/:targetType/:targetId", ctrl.getReviewsForTarget);
router.get("/user/:userId", ctrl.getUserReviews);

module.exports = router;
