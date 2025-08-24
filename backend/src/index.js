import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { sequelize } from "./models/index.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import musicRoutes from "./routes/music.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import listsRoutes from "./routes/lists.routes.js";
import feedRoutes from "./routes/feed.routes.js";

dotenv.config();

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

sequelize
  .sync({ alter: true }) // sync models to DB
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
