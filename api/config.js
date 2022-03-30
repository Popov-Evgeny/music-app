const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadsPath : path.join(rootPath, 'public/uploads'),
  mongo : {
    db: 'mongodb://localhost/music',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '3178357945786662',
    appSecret: '0ac7bd975526f5554d3988f802f72ebb'
  }
}