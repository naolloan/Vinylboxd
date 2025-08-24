import express from "express";
import ctrl from "../controllers/feed.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", auth, ctrl.getFeed);

export default router;
