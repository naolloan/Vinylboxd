const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lists.controller");
const auth = require("../middleware/auth.middleware");

// 📌 Lists
router.post("/", auth, ctrl.createList);
router.get("/user/:userId", ctrl.getUserLists);
router.post("/:listId/items", auth, ctrl.addItemToList);
router.get("/:listId/items", ctrl.getListItems);

module.exports = router;
