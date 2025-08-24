import express from "express";
import * as ctrl from "../controllers/music.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// 🎤 Artists
router.get("/artists", ctrl.listArtists);
router.post("/artists", auth, ctrl.createArtist);

// 💿 Albums
router.get("/albums/:albumId", ctrl.getAlbum);
router.post("/albums", auth, ctrl.createAlbum);

// 🎶 Songs
router.post("/songs", auth, ctrl.createSong);

// 🔍 Search (optional)
// router.get("/search", ctrl.search);

export default router;
