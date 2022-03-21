const mongoose = require('mongoose');
const config = require("./config");
const Albums = require("./models/Album");
const Artists = require("./models/Artist");
const Track = require("./models/Track");
const User = require("./models/User");
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [John, Jack] = await User.create({
    email: 'test@as.com',
    password: '123',
    name: 'John Doe',
    token: nanoid(),
    role: 'admin'
  }, {
    email: 'test@ad.com',
    password: '123',
    name: 'Jack Doe',
    token: nanoid(),
    role: 'user'
  });

  const [Eminem, Linkin] = await Artists.create({
    name: 'Eminem',
    information: 'Public artist',
    image: 'Eminem.jpg',
    isPublished: false
  }, {
    name: 'Linkin-park',
    information: 'Public artist',
    image: 'linkin-park.jpg',
    isPublished: false
  });


  const [Meteora, Kamikaze] = await Albums.create({
    name: 'Meteora',
    author: Linkin,
    year: '2003',
    description: 'Some album Linkin-park',
    image: 'Meteora.jpg',
    isPublished: false
  }, {
    name: 'Kamikaze',
    author: Eminem,
    year: '2001',
    description: 'Some album Eminem',
    image: 'Kamikaze.jpg',
    isPublished: false
  },);

  const [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10] = await Track.create({
    name: 'Don`t Stay',
    album: Meteora,
    duration: '3:08',
    isPublished: false
  }, {
    name: 'Hit the Floor',
    album: Meteora,
    duration: '3:23',
    isPublished: false
  }, {
    name: 'Easier to Run',
    album: Meteora,
    duration: '3:24',
    isPublished: false
  }, {
    name: 'Nobody`s Listening',
    album: Meteora,
    duration: '2:59',
    isPublished: false
  }, {
    name: 'Numb',
    album: Meteora,
    duration: '3:08',
    isPublished: false
  }, {
    name: 'The Ringer',
    album: Kamikaze,
    duration: '5:37',
    isPublished: false
  }, {
    name: 'Greatest',
    album: Kamikaze,
    duration: '3:46',
    isPublished: false
  }, {
    name: 'Lucky You',
    album: Kamikaze,
    duration: '4:04',
    isPublished: false
  }, {
    name: 'Normal',
    album: Kamikaze,
    duration: '3:42',
    isPublished: false
  }, {
    name: 'Stepping Stone',
    album: Kamikaze,
    duration: '5:09',
    isPublished: false
  },);

  await mongoose.connection.close();
};

run().catch(e => console.error(e));