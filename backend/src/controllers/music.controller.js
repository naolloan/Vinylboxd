const { Artist, Album, Song } = require("../models");

exports.createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (err) { next(err); }
};

exports.listArtists = async (_req, res, next) => {
  try {
    const artists = await Artist.findAll({ order: [["createdAt","DESC"]] });
    res.json(artists);
  } catch (err) { next(err); }
};

exports.createAlbum = async (req, res, next) => {
  try {
    const { artistId } = req.body;
    if (!artistId) return res.status(400).json({ message: "artistId required" });
    const album = await Album.create(req.body);
    res.status(201).json(album);
  } catch (err) { next(err); }
};

exports.getAlbum = async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.albumId, { include: [Artist, Song] });
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json(album);
  } catch (err) { next(err); }
};

exports.createSong = async (req, res, next) => {
  try {
    const { albumId } = req.body;
    if (!albumId) return res.status(400).json({ message: "albumId required" });
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) { next(err); }
};

exports.search = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ artists: [], albums: [], songs: [] });

    const like = { [require("sequelize").Op.iLike]: `%${q}%` };
    const [artists, albums, songs] = await Promise.all([
      Artist.findAll({ where: { name: like }, limit: 20 }),
      Album.findAll({ where: { title: like }, limit: 20 }),
      Song.findAll({ where: { title: like }, limit: 20 }),
    ]);
    res.json({ artists, albums, songs });
  } catch (err) { next(err); }
};
