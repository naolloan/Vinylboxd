const { Artist, Album, Song } = require("../models");

exports.createArtist = async (req, res) => {
  try {
    const artist = await Artist.create({ name: req.body.name });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ message: "Failed to create artist", error: err.message });
  }
};

exports.listArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: "Failed to list artists", error: err.message });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const { title, artistId } = req.body;
    const artist = await Artist.findByPk(artistId);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const album = await Album.create({ title, artistId });
    res.json(album);
  } catch (err) {
    res.status(400).json({ message: "Failed to create album", error: err.message });
  }
};

exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.albumId, { include: [Song] });
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch album", error: err.message });
  }
};

exports.createSong = async (req, res) => {
  try {
    const { title, albumId } = req.body;
    const album = await Album.findByPk(albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });

    const song = await Song.create({ title, albumId });
    res.json(song);
  } catch (err) {
    res.status(400).json({ message: "Failed to create song", error: err.message });
  }
};
