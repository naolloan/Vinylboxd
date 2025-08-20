const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Artist = sequelize.define("Artist", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING },
  }, { tableName: "artists", timestamps: true });

  return Artist;
};
