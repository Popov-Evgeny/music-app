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

router.post('/', upload.single('avatar'), async (req, res, next) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
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
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send({error: 'User not found'})
    }

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch) {
      return res.status(400).send({error: 'Password is wrong'});
    }

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

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK'};

    if (!token) return res.send(message);

    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

module.exports = router;