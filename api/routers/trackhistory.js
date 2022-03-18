const express = require('express');
const mongoose = require('mongoose');
const THistory = require('../models/TrackHistory');
const auth = require("../middleware/auth");
const Albums = require("../models/Album");

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const history = await THistory.find({user: req.user._id}).sort({datetime: -1}).populate('track','name');
    let arrArtists = [];

    for (let album of history) {
      console.log(album.track._id);
      const artist = await Albums.findOne({author: album.track._id}).populate('author', 'name');
      arrArtists.push(artist)
    }

    console.log(arrArtists);
    return res.send(history)
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