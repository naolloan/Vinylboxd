import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Register new user
router.post("/register", authCtrl.register);

// Login user
router.post("/login", authCtrl.login);

export default router;
