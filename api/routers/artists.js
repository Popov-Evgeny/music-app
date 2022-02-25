const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const Artist = require('../models/Artist');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req,file,cd) => {
    cd(null, config.uploadsPath);
  },
  filename: (req, file, cd) => {
    cd(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.get('/', async (req , res) => {
  const artists = await Artist.find();
  res.send(artists);
});

router.post('/', upload.single('image'), async (req , res, next) => {
  try {
    if (!req.body.name) {
      return res.status(500).send({massage: 'Check if the input is correct'});
    }

    const artistData = {
      name: req.body.name,
      information: req.body.information,
      image: null
    }

    if (req.file) {
      artistData.image = req.file.filename;
    }

    const artist = new Artist(artistData);
    await artist.save();

    return res.send({message: 'Added new artist in database'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;