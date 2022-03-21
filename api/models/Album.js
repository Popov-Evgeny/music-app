const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  year: String,
  image: String,
    isPublished: {
    type: Boolean,
    required: true
  }
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;