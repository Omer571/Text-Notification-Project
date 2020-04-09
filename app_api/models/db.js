// jshint esversion: 6

const mongoose  = require('mongoose');

let mongoURI = 'mongodb://localhost:27017/notificationDB';
const options =  {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connection = mongoose.connect(mongoURI, options);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = connection;
