import express from "express";
import * as ctrl from "../controllers/users.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:username", ctrl.getProfile);
router.put("/me", auth, ctrl.updateProfile);
router.post("/:userId/follow", auth, ctrl.follow);
router.delete("/:userId/follow", auth, ctrl.unfollow);

export default router;
