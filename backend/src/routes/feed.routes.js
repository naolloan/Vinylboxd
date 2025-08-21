const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/feed.controller");
const auth = require("../middleware/auth.middleware");

// 📌 Activity Feed
router.get("/", auth, ctrl.getFeed);

module.exports = router;
