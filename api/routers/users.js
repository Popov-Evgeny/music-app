const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");

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

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({message: 'Enter your name please'});
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
      displayname: req.body.displayname,
      avatar: null
    }

    if (req.file) {
      userData.avatar = req.file.filename;
    }

    const user = new User(userData);
    user.generateToken();

    await user.save();

    return res.send(user);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({name: req.body.name});

    if (!user) {
      return res.status(400).send({error: 'User not found'})
    }

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch) {
      return res.status(400).send({error: 'Password is wrong'});
    }

    user.generateToken();
    await user.save();

    return res.send({token: user.token});
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});


module.exports = router;