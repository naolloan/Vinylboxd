import express from "express";
import * as ctrl from "../controllers/reviews.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// Create review
router.post("/", auth, ctrl.createReview);

// Get reviews for a target (album, song, or artist)
router.get("/:targetType/:targetId", ctrl.getReviews);

// Delete review
router.delete("/:reviewId", auth, ctrl.deleteReview);

export default router;
