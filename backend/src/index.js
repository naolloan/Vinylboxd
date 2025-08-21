const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const authRoutes = require("./routes/auth.routes"); // ⬅️ ADD THIS

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes); // ⬅️ ADD THIS

const PORT = process.env.PORT || 4000;

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database connected & models synced");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
