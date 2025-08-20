const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Song = sequelize.define("Song", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    durationSec: { type: DataTypes.INTEGER },
    trackNumber: { type: DataTypes.INTEGER },
  }, { tableName: "songs", timestamps: true });

  return Song;
};
