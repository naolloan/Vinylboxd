const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/music.controller");
const auth = require("../middleware/auth.middleware");

// 🎤 Artists
router.get("/artists", ctrl.listArtists);
router.post("/artists", auth, ctrl.createArtist);

// 💿 Albums
router.get("/albums/:albumId", ctrl.getAlbum);
router.post("/albums", auth, ctrl.createAlbum);

// 🎶 Songs
router.post("/songs", auth, ctrl.createSong);

// 🔍 Search
//router.get("/search", ctrl.search);

module.exports = router;
