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

  const [Eminem, Linkin, Disturbed, Snoop_Dogg] = await Artists.create({
    name: 'Eminem',
    information: 'Public artist',
    image: 'Eminem.jpg',
    isPublished: false
  }, {
    name: 'Linkin-park',
    information: 'Public artist',
    image: 'linkin_park.jpg',
    isPublished: true
  }, {
    name: 'Disturbed',
    information: 'Public artist',
    image: 'disturbed.jpg',
    isPublished: false
  }, {
    name: 'Snoop_Dogg',
    information: 'Public artist',
    image: 'snoop.jpeg',
    isPublished: true
  });


  const [Indestructible, Meteora, Kamikaze, Asylum, Reincarnated, One_More_Light] = await Albums.create({
    name: 'Indestructible',
    author: Disturbed,
    year: '2009',
    description: 'Some album Disturbed',
    image: 'Indestructible.jpg',
    isPublished: true
  }, {
    name: 'Meteora',
    author: Linkin,
    year: '2001',
    description: 'Some album Linkin-park',
    image: 'Meteora.jpg',
    isPublished: true
  }, {
    name: 'Normal',
    author: Eminem,
    year: '2001',
    description: 'Some album Eminem',
    image: 'Kamikaze.jpg',
    isPublished: false
  },{
    name: 'Asylum',
    author: Disturbed,
    year: '2010',
    description: 'Some album Disturbed',
    image: 'Asylum.jpg',
    isPublished: false
  }, {
    name: 'Reincarnated',
    author: Snoop_Dogg,
    year: '2013',
    description: 'Some album Snoop_Dogg',
    image: 'Reincarnated.jpg',
    isPublished: true
  }, {
    name: 'One More Light',
    author: Linkin,
    year: '2017',
    description: 'Some album Linkin-park',
    image: 'link.jpg',
    isPublished: true
  },);

  await Track.create({
    name: 'Don`t Stay',
    album: Meteora,
    duration: '3:08',
    isPublished: true
  }, {
    name: 'Hit the Floor',
    album: Meteora,
    duration: '3:23',
    isPublished: true
  }, {
    name: 'Easier to Run',
    album: Meteora,
    duration: '3:24',
    isPublished: true
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
    isPublished: true
  }, {
    name: 'Greatest',
    album: Kamikaze,
    duration: '3:46',
    isPublished: true
  }, {
    name: 'Lucky You',
    album: Kamikaze,
    duration: '4:04',
    isPublished: true
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
  }, {
    name: 'Indestructible',
    album: Indestructible,
    duration: '4:38',
    isPublished: true
  }, {
    name: 'Inside the Fire',
    album: Indestructible,
    duration: '3:52',
    isPublished: true
  }, {
    name: 'Tom',
    album: Indestructible,
    duration: '4:09',
    isPublished: true
  }, {
    name: 'Deceiver',
    album: Indestructible,
    duration: '3:49',
    isPublished: false
  }, {
    name: 'Criminal',
    album: Indestructible,
    duration: '4:16',
    isPublished: false
  },  {
    name: 'Asylum',
    album: Asylum,
    duration: '4:38',
    isPublished: true
  }, {
    name: 'Warrior',
    album: Asylum,
    duration: '3:25',
    isPublished: true
  }, {
    name: 'Serpentine',
    album: Asylum,
    duration: '4:09',
    isPublished: true
  }, {
    name: 'My Child',
    album: Asylum,
    duration: '3:19',
    isPublished: false
  }, {
    name: 'Animal',
    album: Asylum,
    duration: '4:16',
    isPublished: false
  },  {
    name: 'Get Away',
    album: Reincarnated,
    duration: '4:38',
    isPublished: true
  }, {
    name: 'Smoke the Weed',
    album: Reincarnated,
    duration: '3:25',
    isPublished: true
  }, {
    name: 'Torn Apart',
    album: Reincarnated,
    duration: '4:09',
    isPublished: true
  }, {
    name: 'The Good Good',
    album: Reincarnated,
    duration: '3:19',
    isPublished: false
  }, {
    name: 'So Long',
    album: Reincarnated,
    duration: '4:16',
    isPublished: false
  },  {
    name: 'Invisible',
    album: One_More_Light,
    duration: '4:38',
    isPublished: true
  }, {
    name: 'Halfway Right',
    album: One_More_Light,
    duration: '3:25',
    isPublished: true
  }, {
    name: 'One More Light',
    album: One_More_Light,
    duration: '4:09',
    isPublished: true
  }, {
    name: 'Sorry for Now',
    album: One_More_Light,
    duration: '3:19',
    isPublished: false
  }, {
    name: 'Good Goodbye',
    album: One_More_Light,
    duration: '4:16',
    isPublished: false
  },);

  await mongoose.connection.close();
};

run().catch(e => console.error(e));