const express = require('express');
const mongoose = require('mongoose');
const THistory = require('../models/TrackHistory');
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.track) {
      return res.status(400).send({error: 'Enter track Id please!'});
    }
    const tHistoryData = {
      user: req.user._id,
      track: req.body.track,
      datetime: new Date().toISOString()
    }

    const tHistory = new THistory(tHistoryData);
    await tHistory.save()

    return res.send(tHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
}});
module.exports = router;