import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ActivityFeed = sequelize.define("ActivityFeed", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    actionType: { type: DataTypes.ENUM("logged", "reviewed", "liked", "followed", "listed"), allowNull: false },
    subjectType: { type: DataTypes.ENUM("album", "song", "review", "list", "user"), allowNull: false },
    subjectId: { type: DataTypes.UUID, allowNull: false },
    metadata: { type: DataTypes.JSONB },
  }, { tableName: "activity_feed", timestamps: true });

  return ActivityFeed;
};
