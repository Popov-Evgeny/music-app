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
  }, {
    name: 'Linkin-park',
    information: 'Public artist',
    image: 'linkin-park.jpg',
  });


  const [Meteora, Kamikaze] = await Albums.create({
    name: 'Meteora',
    author: Linkin,
    year: '2003',
    description: 'Some album Linkin-park',
    image: 'Meteora.jpg'
  }, {
    name: 'Kamikaze',
    author: Eminem,
    year: '2001',
    description: 'Some album Eminem',
    image: 'Kamikaze.jpg'
  },);

  const [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10] = await Track.create({
    name: 'Don`t Stay',
    album: Meteora,
    duration: '3:08',
  }, {
    name: 'Hit the Floor',
    album: Meteora,
    duration: '3:23',
  }, {
    name: 'Easier to Run',
    album: Meteora,
    duration: '3:24',
  }, {
    name: 'Nobody`s Listening',
    album: Meteora,
    duration: '2:59',
  }, {
    name: 'Numb',
    album: Meteora,
    duration: '3:08',
  }, {
    name: 'The Ringer',
    album: Kamikaze,
    duration: '5:37',
  }, {
    name: 'Greatest',
    album: Kamikaze,
    duration: '3:46',
  }, {
    name: 'Lucky You',
    album: Kamikaze,
    duration: '4:04',
  }, {
    name: 'Normal',
    album: Kamikaze,
    duration: '3:42',
  }, {
    name: 'Stepping Stone',
    album: Kamikaze,
    duration: '5:09',
  },);

  await mongoose.connection.close();
};

run().catch(e => console.error(e));