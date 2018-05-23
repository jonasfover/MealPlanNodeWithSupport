var mongoose = require('mongoose');

mongoose.connect('mongodb://aqebutto.documents.azure.com:10255/Food?ssl=true', {
    auth: {
      user: 'aqebutto',
      password: 'fZOiwWclvNFheTEpvTETRSqPx38TVuqkhpzarnD7T0XzrYGJMatiPLmfyEsbMUMCDdiCQIoQeArFELjyurphLg=='
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));


module.exports = {mongoose};
