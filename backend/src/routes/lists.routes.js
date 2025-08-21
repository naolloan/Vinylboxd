const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lists.controller");
const auth = require("../middleware/auth.middleware");

// Create a new list
router.post("/", auth, ctrl.createList);

// Get all lists for logged-in user
router.get("/", auth, ctrl.getLists);

// Get a single list by ID
router.get("/:listId", auth, ctrl.getListById);

// Delete a list
router.delete("/:listId", auth, ctrl.deleteList);

module.exports = router;
