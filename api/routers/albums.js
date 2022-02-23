const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');


const router = express.Router()

router.get('/', (req , res) => {
  res.send('get request - albums');
});

router.post('/', (req , res) => {
  res.send('post request - albums');
});


module.exports = router;