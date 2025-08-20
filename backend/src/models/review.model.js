const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define("Review", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    targetType: { type: DataTypes.ENUM("album", "song"), allowNull: false },
    targetId: { type: DataTypes.UUID, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0, max: 5 } },
    reviewText: { type: DataTypes.TEXT },
  }, { tableName: "reviews", timestamps: true });

  return Review;
};
