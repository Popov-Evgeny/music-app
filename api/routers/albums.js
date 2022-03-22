const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require("../config");
const path = require("path");
const Albums = require("../models/Album");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

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

router.post('/', auth, permit('admin', 'user'),  upload.single('image'), async (req , res, next) => {
  try {
    if (!req.body.name) {
      return res.status(500).send({massage: 'Check if the input is correct'});
    }

    const albumData = {
      name: req.body.name,
      author: req.body.author,
      year: req.body.year,
      image: null,
      isPublished: false
    }

    if (req.file) {
      albumData.image = req.file.filename;
    }

    if (req.user.role === 'admin') {
      albumData.isPublished = true;
    }

    const album = new Albums(albumData);

    await album.save();

    return res.send({message: 'Added new album in database'});
  } catch (e) {
    next(e);
  }
});

router.post('/:id/publish', auth, permit('admin'), async (req , res, next) => {
  try {
    await Albums.updateOne({_id: req.params.id}, {isPublished: req.body.isPublished})

    return res.send({message: 'Album published!'});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async (req , res, next) => {
  try {
    await Albums.deleteOne({_id: req.params.id});

    return res.send({message: 'Albums delete!!'});
  } catch (e) {
    next(e);
  }
});

module.exports = router;