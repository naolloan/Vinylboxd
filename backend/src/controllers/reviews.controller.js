// backend/src/controllers/review.controller.js
const { Review, Album, Song } = require("../models");

exports.createReview = async (req, res) => {
  try {
    const { albumId, songId, rating, comment } = req.body;

    let targetType, targetId;

    if (albumId) {
      // make sure album exists
      const album = await Album.findByPk(albumId);
      if (!album) return res.status(404).json({ message: "Album not found" });
      targetType = "album";
      targetId = albumId;
    } else if (songId) {
      // make sure song exists
      const song = await Song.findByPk(songId);
      if (!song) return res.status(404).json({ message: "Song not found" });
      targetType = "song";
      targetId = songId;
    } else {
      return res.status(400).json({ message: "Must provide albumId or songId" });
    }

    const review = await Review.create({
      userId: req.user.id,
      targetType,
      targetId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to create review", error: err.message });
  }
};

exports.getAlbumReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { targetType: "album", targetId: req.params.albumId },
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
};

exports.getSongReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { targetType: "song", targetId: req.params.songId },
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
};
