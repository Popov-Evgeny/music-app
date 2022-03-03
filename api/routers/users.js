const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();


router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({message: 'Enter your name please'});
    }

    const user = new User(req.body);

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
  const user = await User.findOne({name: req.body.name});

  if (!user) {
    return res.status(400).send({error: 'User not found'})
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if(!isMatch) {
    return res.status(400).send({error: 'Password is wrong'});
  }

  return res.send({message: 'Username and password correct!'});

});


module.exports = router;