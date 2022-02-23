const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');
const artists = require('./routers/artists');
const albums = require('./routers/albums');

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artists);
app.use('/albums', albums);


const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));