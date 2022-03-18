const express = require('express');
const mongoose = require('mongoose');
const THistory = require('../models/TrackHistory');
const auth = require("../middleware/auth");
const Track = require("../models/Track");
const Album = require("../models/Album");

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const history = await THistory.find({user: req.user._id}).sort({datetime: -1}).populate('track','_id name');

    const tracksId = history.map( history => history.track._id);

    const albumsId = [];
    let counterAlbum = 0;

    for (let id in tracksId) {
      const author = await Track.findOne({_id: {$in: tracksId[counterAlbum]}}).populate('album', '_id');
      albumsId.push(author.album._id)
      counterAlbum++
    }

    const authors = [];
    let counterAuthor = 0;

    for (let id in albumsId) {
      const author = await Album.findOne({_id:  albumsId[counterAuthor]}).populate('author', 'name');
      authors.push(author.author.name)
      counterAuthor++
    }

    let counterArtist = 0;

    const newHistory = history.map( history => {
      const objHistory = {
        user: history.user,
        track: history.track,
        datetime: history.datetime,
        artist: authors[counterArtist]
      }
      counterArtist++
      return objHistory;
    });

    return res.send(newHistory)
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    if (!req.body.track) {
      return res.status(400).send({error: 'Enter track Id please!'});
    }
    const tHistoryData = {
      user: req.user._id,
      track: req.body.track,
      datetime: new Date().toISOString()
    }

    const tHistory = new THistory(tHistoryData);
    await tHistory.save()

    return res.send(tHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
}});
module.exports = router;