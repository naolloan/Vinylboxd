const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const List = sequelize.define("List", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    type: { type: DataTypes.ENUM("list", "mixtape"), allowNull: false, defaultValue: "list" },
    isPublic: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: "lists", timestamps: true });

  return List;
};
