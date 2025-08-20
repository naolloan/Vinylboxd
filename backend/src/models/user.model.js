const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { isEmail: true } },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT },
    avatarUrl: { type: DataTypes.STRING }
  }, { tableName: "users", timestamps: true });

  return User;
};
