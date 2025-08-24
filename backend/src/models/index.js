// src/models/index.js
import sequelize from "../config/db.js";

// Import model factories
import UserFactory from "./user.model.js";
import ArtistFactory from "./artist.model.js";
import AlbumFactory from "./album.model.js";
import SongFactory from "./song.model.js";
import ReviewFactory from "./review.model.js";
import ListFactory from "./list.model.js";
import ListItemFactory from "./listItem.model.js";
import FollowerFactory from "./follower.model.js";
import ActivityFeedFactory from "./activityFeed.model.js";

// Initialize models
const User = UserFactory(sequelize);
const Artist = ArtistFactory(sequelize);
const Album = AlbumFactory(sequelize);
const Song = SongFactory(sequelize);
const Review = ReviewFactory(sequelize);
const List = ListFactory(sequelize);
const ListItem = ListItemFactory(sequelize);
const Follower = FollowerFactory(sequelize);
const ActivityFeed = ActivityFeedFactory(sequelize);

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
  otherKey: "followerId",
});
User.belongsToMany(User, {
  as: "Following",
  through: Follower,
  foreignKey: "followerId",
  otherKey: "followingId",
});

// Activity
User.hasMany(ActivityFeed, { foreignKey: "userId", onDelete: "CASCADE" });
ActivityFeed.belongsTo(User, { foreignKey: "userId" });

// ✅ Export models and sequelize
export {
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
