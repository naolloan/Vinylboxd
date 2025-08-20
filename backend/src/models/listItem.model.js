const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ListItem = sequelize.define("ListItem", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    targetType: { type: DataTypes.ENUM("album", "song"), allowNull: false },
    targetId: { type: DataTypes.UUID, allowNull: false },
    order: { type: DataTypes.INTEGER },
    note: { type: DataTypes.TEXT }
  }, { tableName: "list_items", timestamps: true });

  return ListItem;
};
