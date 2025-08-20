const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lists.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, ctrl.createList);
router.get("/:listId", ctrl.getList);
router.get("/user/:userId", ctrl.userLists);

router.post("/:listId/items", auth, ctrl.addListItem);
router.delete("/items/:listItemId", auth, ctrl.removeListItem);

module.exports = router;
