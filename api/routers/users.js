const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();


router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({message: 'Enter your name please'});
    }

    const user = new User(req.body);
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