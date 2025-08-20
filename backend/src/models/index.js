const sequelize = require("../config/db");

// Import model factories
const User = require("./user.model")(sequelize);
const Artist = require("./artist.model")(sequelize);
const Album = require("./album.model")(sequelize);
const Song = require("./song.model")(sequelize);
const Review = require("./review.model")(sequelize);
const List = require("./list.model")(sequelize);
const ListItem = require("./listItem.model")(sequelize);
const Follower = require("./follower.model")(sequelize);
const ActivityFeed = require("./activityFeed.model")(sequelize);

// Associations

// Artist ↔ Album
Artist.hasMany(Album, { foreignKey: "artistId", onDelete: "CASCADE" });
Album.belongsTo(Artist, { foreignKey: "artistId" });

// Album ↔ Song
Album.hasMany(Song, { foreignKey: "albumId", onDelete: "CASCADE" });
Song.belongsTo(Album, { foreignKey: "albumId" });

// User ↔ Review
User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

// Lists
User.hasMany(List, { foreignKey: "userId", onDelete: "CASCADE" });
List.belongsTo(User, { foreignKey: "userId" });

List.hasMany(ListItem, { foreignKey: "listId", onDelete: "CASCADE" });
ListItem.belongsTo(List, { foreignKey: "listId" });

// Followers (self-referential many-to-many through Follower)
User.belongsToMany(User, {
  as: "Followers",
  through: Follower,
  foreignKey: "followingId",
  otherKey: "followerId"
});
User.belongsToMany(User, {
  as: "Following",
  through: Follower,
  foreignKey: "followerId",
  otherKey: "followingId"
});

// Activity
User.hasMany(ActivityFeed, { foreignKey: "userId", onDelete: "CASCADE" });
ActivityFeed.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Artist,
  Album,
  Song,
  Review,
  List,
  ListItem,
  Follower,
  ActivityFeed,
};
