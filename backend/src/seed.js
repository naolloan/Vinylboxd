require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sequelize, User, Artist, Album, Song } = require("./models");

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Drop and re-create all tables
    await sequelize.sync({ force: true });

    // --- Users ---
    const passwordHash = await bcrypt.hash("bluegres", 10);
    const user1 = await User.create({
      username: "abi",
      email: "abi@example.com",
      password: passwordHash,
    });

    const user2 = await User.create({
      username: "john",
      email: "john@example.com",
      password: passwordHash,
    });

    // --- Artists & Albums ---
    const artist = await Artist.create({ name: "Daft Punk" });
    const album = await Album.create({
      title: "Discovery",
      artistId: artist.id,
    });

    // --- Songs ---
    await Song.bulkCreate([
      { title: "One More Time", albumId: album.id },
      { title: "Harder, Better, Faster, Stronger", albumId: album.id },
    ]);

    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
