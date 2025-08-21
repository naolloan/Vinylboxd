require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { sequelize } = require("./models");

// Routes
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const listsRoutes = require("./routes/lists.routes");
const feedRoutes = require("./routes/feed.routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/lists", listsRoutes);
app.use("/api/feed", feedRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Vinylboxd API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 4000;

sequelize.sync({ alter: true }) // sync models to DB
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
