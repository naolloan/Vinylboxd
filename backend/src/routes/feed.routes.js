const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/feed.controller");
const auth = require("../middleware/auth.middleware");

// Get user feed (latest reviews + lists)
router.get("/", auth, ctrl.getFeed);

module.exports = router;
