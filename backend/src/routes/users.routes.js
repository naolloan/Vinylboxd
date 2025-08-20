const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/users.controller");
const auth = require("../middleware/auth.middleware");

router.get("/:username", ctrl.getProfile);
router.put("/me", auth, ctrl.updateProfile);
router.post("/:userId/follow", auth, ctrl.follow);
router.delete("/:userId/follow", auth, ctrl.unfollow);

module.exports = router;
