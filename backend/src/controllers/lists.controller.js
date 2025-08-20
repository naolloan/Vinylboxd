const { List, ListItem, ActivityFeed } = require("../models");

exports.createList = async (req, res, next) => {
  try {
    const { title, description, type, isPublic } = req.body;
    const list = await List.create({ userId: req.user.id, title, description, type, isPublic });
    await ActivityFeed.create({
      userId: req.user.id,
      actionType: "listed",
      subjectType: "list",
      subjectId: list.id,
      metadata: { title }
    });
    res.status(201).json(list);
  } catch (err) { next(err); }
};

exports.addListItem = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { targetType, targetId, order, note } = req.body;

    const list = await List.findByPk(listId);
    if (!list) return res.status(404).json({ message: "List not found" });
    if (list.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const item = await ListItem.create({ listId, targetType, targetId, order, note });
    res.status(201).json(item);
  } catch (err) { next(err); }
};

exports.removeListItem = async (req, res, next) => {
  try {
    const { listItemId } = req.params;
    const item = await ListItem.findByPk(listItemId, { include: [List] });
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.List.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await item.destroy();
    res.json({ message: "Removed" });
  } catch (err) { next(err); }
};

exports.getList = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const list = await List.findByPk(listId, { include: [ListItem] });
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  } catch (err) { next(err); }
};

exports.userLists = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const lists = await List.findAll({ where: { userId }, order: [["createdAt","DESC"]] });
    res.json(lists);
  } catch (err) { next(err); }
};
