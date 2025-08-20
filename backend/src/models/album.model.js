const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Album = sequelize.define("Album", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    releaseYear: { type: DataTypes.INTEGER },
    coverArtUrl: { type: DataTypes.STRING },
    type: { type: DataTypes.ENUM("album", "ep", "single"), allowNull: false, defaultValue: "album" },
    label: { type: DataTypes.STRING },
    producer: { type: DataTypes.STRING },
    runtimeSec: { type: DataTypes.INTEGER }, // total runtime in seconds
  }, { tableName: "albums", timestamps: true });

  return Album;
};
