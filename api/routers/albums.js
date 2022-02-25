const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require("../config");
const path = require("path");
const Albums = require("../models/Album");
const Artist = require("../models/Artist");


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
  const query = {};
  if (req.query.artist){
    query.author = {_id: req.query.artist};
  }
  const albums = await Albums.find(query).populate('author', 'name');
  res.send(albums);
});

router.get('/:id', async (req , res) => {
  const album = await Albums.findById(req.params.id).populate('author', 'name');
  res.send(album);
});

router.get('/withArtist/:id', async (req , res) => {
  const albumWithArtist = await Albums.find({author: {_id: req.params.id}}).populate('author', 'name information');
  res.send(albumWithArtist);
});

router.post('/', upload.single('image'), async (req , res, next) => {
  try {
    if (!req.body.name) {
      return res.status(500).send({massage: 'Check if the input is correct'});
    }

    const albumData = {
      name: req.body.name,
      author: req.body.author,
      year: req.body.year,
      image: null
    }

    if (req.file) {
      albumData.image = req.file.filename;
    }

    const album = new Albums(albumData);

    await album.save();

    return res.send({message: 'Added new album in database'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;