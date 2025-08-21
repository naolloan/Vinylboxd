const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");

// Register new user
router.post("/register", authCtrl.register);

// Login user
router.post("/login", authCtrl.login);

module.exports = router;
