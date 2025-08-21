const { sequelize, User, Artist, Album, Song, Review } = require("./models");

async function seed() {
  try {
    await sequelize.sync({ force: true }); // ⚠️ drops and recreates tables

    // Users
    const user1 = await User.create({
      username: "kendrickfan",
      email: "kendrick@example.com",
      password: "password123", // make sure your model hashes it if hook exists
    });

    const user2 = await User.create({
      username: "drakefan",
      email: "drake@example.com",
      password: "password123",
    });

    // Artists
    const kendrick = await Artist.create({ name: "Kendrick Lamar" });
    const drake = await Artist.create({ name: "Drake" });

    // Albums
    const damn = await Album.create({ title: "DAMN", artistId: kendrick.id });
    const views = await Album.create({ title: "Views", artistId: drake.id });

    // Songs
    const humble = await Song.create({ title: "HUMBLE.", albumId: damn.id });
    const hotline = await Song.create({ title: "Hotline Bling", albumId: views.id });

    // Reviews
    await Review.create({
      userId: user1.id,
      targetType: "album",
      targetId: damn.id,
      content: "Masterpiece, 10/10!",
      rating: 5,
    });

    await Review.create({
      userId: user2.id,
      targetType: "song",
      targetId: hotline.id,
      content: "Catchy but overplayed.",
      rating: 3,
    });

    console.log("✅ Seed data inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
