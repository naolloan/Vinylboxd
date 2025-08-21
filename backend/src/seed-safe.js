const { sequelize, User, Artist, Album, Song, Review } = require("./models");

async function seedSafe() {
  try {
    await sequelize.sync(); // ✅ keeps existing data, just ensures schema

    // 🔑 Users
    const [user1] = await User.findOrCreate({
      where: { email: "kendrick@example.com" },
      defaults: { username: "kendrickfan", password: "password123" },
    });

    const [user2] = await User.findOrCreate({
      where: { email: "drake@example.com" },
      defaults: { username: "drakefan", password: "password123" },
    });

    // 🎤 Artists
    const [kendrick] = await Artist.findOrCreate({
      where: { name: "Kendrick Lamar" },
    });

    const [drake] = await Artist.findOrCreate({
      where: { name: "Drake" },
    });

    // 💿 Albums
    const [damn] = await Album.findOrCreate({
      where: { title: "DAMN", artistId: kendrick.id },
    });

    const [views] = await Album.findOrCreate({
      where: { title: "Views", artistId: drake.id },
    });

    // 🎵 Songs
    const [humble] = await Song.findOrCreate({
      where: { title: "HUMBLE.", albumId: damn.id },
    });

    const [hotline] = await Song.findOrCreate({
      where: { title: "Hotline Bling", albumId: views.id },
    });

    // 📝 Reviews
    await Review.findOrCreate({
      where: { userId: user1.id, targetType: "album", targetId: damn.id },
      defaults: { content: "Masterpiece, 10/10!", rating: 5 },
    });

    await Review.findOrCreate({
      where: { userId: user2.id, targetType: "song", targetId: hotline.id },
      defaults: { content: "Catchy but overplayed.", rating: 3 },
    });

    console.log("✅ Safe seed completed (no duplicates created).");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seedSafe();
