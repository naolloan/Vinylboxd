require("dotenv").config();
const app = require("./server");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    // TIP: in development you can use { alter: true } to auto-migrate
    await sequelize.sync(); // or .sync({ alter: true }) in dev
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
