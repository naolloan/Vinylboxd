const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "tiny"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/music", require("./routes/music.routes"));
app.use("/api/reviews", require("./routes/reviews.routes"));
app.use("/api/lists", require("./routes/lists.routes"));
app.use("/api/feed", require("./routes/feed.routes"));

app.use(errorHandler);

module.exports = app;
