import { List } from "../models/index.js";

const listsCtrl = {
  createList: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const list = await List.create({
        title,
        description,
        userId: req.user.id,
      });

      res.status(201).json(list);
    } catch (err) {
      res.status(500).json({
        message: "Failed to create list",
        error: err.message,
      });
    }
  },

  getLists: async (req, res) => {
    try {
      const lists = await List.findAll({
        where: { userId: req.user.id },
      });
      res.json(lists);
    } catch (err) {
      res.status(500).json({
        message: "Failed to fetch lists",
        error: err.message,
      });
    }
  },

  getListById: async (req, res) => {
    try {
      const list = await List.findOne({
        where: {
          id: req.params.listId,
          userId: req.user.id,
        },
      });

      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }

      res.json(list);
    } catch (err) {
      res.status(500).json({
        message: "Failed to fetch list",
        error: err.message,
      });
    }
  },

  deleteList: async (req, res) => {
    try {
      const deleted = await List.destroy({
        where: {
          id: req.params.listId,
          userId: req.user.id,
        },
      });

      if (!deleted) {
        return res.status(404).json({ message: "List not found or not yours" });
      }

      res.json({ message: "List deleted successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Failed to delete list",
        error: err.message,
      });
    }
  }
};

export default listsCtrl;
