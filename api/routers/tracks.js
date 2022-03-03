const express = require('express');
const mongoose = require('mongoose');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res, next) => {
 try {
   const query = {};
   if (req.query.album){
     query.author = {_id: req.query.album};
   }
   const tracks = await Track.find(query).populate('album', 'name');
   return res.send(tracks);
 } catch (e) {
   if (e instanceof mongoose.Error.ValidationError) {
     return res.status(400).send(e);
   }
   return next(e);
 }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name) {
      res.status(400).send({message: 'Enter track name please'})
    }

    if (!req.body.album) {
      res.status(400).send({message: 'Enter album please'})
    }

    const trackData = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration
    }

    const track = new Track(trackData);
    await track.save();

    return res.send(track);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

module.exports = router;