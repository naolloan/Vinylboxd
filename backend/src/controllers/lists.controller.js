const { List, ListItem, Album } = require("../models");

// Create a new list
exports.createList = async (req, res) => {
  try {
    const { name, description } = req.body;

    const list = await List.create({
      userId: req.user.id,
      name,
      description,
    });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to create list", error: err.message });
  }
};

// Get all lists for a specific user
exports.getUserLists = async (req, res) => {
  try {
    const { userId } = req.params;

    const lists = await List.findAll({
      where: { userId },
      include: [{ model: ListItem, include: [Album] }],
    });

    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lists", error: err.message });
  }
};

// Add an item (album) to a list
exports.addItemToList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { albumId } = req.body;

    const item = await ListItem.create({
      listId,
      albumId,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item to list", error: err.message });
  }
};

// Get items in a list
exports.getListItems = async (req, res) => {
  try {
    const { listId } = req.params;

    const items = await ListItem.findAll({
      where: { listId },
      include: [Album],
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch list items", error: err.message });
  }
};
