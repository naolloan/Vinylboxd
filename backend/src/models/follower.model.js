import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Follower = sequelize.define("Follower", {
    followerId: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    followingId: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  }, { tableName: "followers", timestamps: true });

  return Follower;
};
