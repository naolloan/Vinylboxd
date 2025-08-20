const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/music.controller");
const auth = require("../middleware/auth.middleware");

// Artists
router.post("/artists", auth, ctrl.createArtist);
router.get("/artists", ctrl.listArtists);

// Albums
router.post("/albums", auth, ctrl.createAlbum);
router.get("/albums/:albumId", ctrl.getAlbum);

// Songs
router.post("/songs", auth, ctrl.createSong);

// Search
router.get("/search", ctrl.search);

module.exports = router;
