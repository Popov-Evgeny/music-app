const express = require('express');
const mongoose = require('mongoose');
const Track = require('../models/Track');
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', async (req, res, next) => {
 try {
   const query = {};
   let artistsTracks = [];

   if (req.query.album){
     query.album = {_id: req.query.album};
   }

   if (req.query.artist) {
     const albums = await Album.find({author: {_id: req.query.artist}});
         for (let album of albums) {
           artistsTracks= await Track.find({album: {_id: album._id}});
         }
     return res.send(artistsTracks);
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

router.get('/byAlbum/:albumID', async (req,res,next) => {
  try {
    const albums = await Album.find({_id: req.params.albumID}).populate('author', 'name');
    const artists = await Artist.find({_id: albums[0].author._id});
    const tracks = await Track.find({album: {_id: albums[0]._id}}).populate('album', 'name');
    const info = {
      artist: artists[0],
      album: albums[0],
      track: tracks
    }
    return res.send(info);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }

});


router.post('/', auth, permit,  async (req, res, next) => {
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