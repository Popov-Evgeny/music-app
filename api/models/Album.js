const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name : {
    type: String
  },
  executor: {
    type: String
  },
  year: {
    type: String
  },
  coverImage: {
    type: String
  }
});

const Album = mongoose.model('Artist', AlbumSchema);

module.exports = Album;