const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const axios = require('axios');

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

router.post('/facebookLogin', async (req, res) => {
  try {
    const inputToken = req.body.authToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

      const response = await axios.get(debugTokenUrl);

      if (response.data.data.error) {
        return res.status(401).send({message: 'Facebook token incorrect'});
      }

      if (req.body.id !== response.data.data.user_id) {
        return res.status(401).send({message: 'Wrong user ID'});
      }

      let user = await User.findOne({facebookId: req.body.id});

      if (!user) {
        user = new User({
          email: req.body.email,
          password: nanoid(),
          facebookId: req.body.id,
          name: req.body.name,
          avatar: req.body.avatar
        });
      }
    console.log(user);
    user.generateToken();
      await user.save();

      return res.send(user);

  } catch (e) {
      return res.status(401).send({message: 'Facebook token incorrect'});
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

    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

module.exports = router;