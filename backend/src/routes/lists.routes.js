import express from "express";
import ctrl from "../controllers/lists.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, ctrl.createList);
router.get("/", auth, ctrl.getLists);
router.get("/:listId", auth, ctrl.getListById);
router.delete("/:listId", auth, ctrl.deleteList);

export default router;
