const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviews.controller");
const auth = require("../middleware/auth.middleware");

// Create a review
router.post("/", auth, ctrl.createReview);

// Get reviews for an album
router.get("/albums/:albumId", ctrl.getAlbumReviews);

// Get reviews for a song
router.get("/songs/:songId", ctrl.getSongReviews);

module.exports = router;
