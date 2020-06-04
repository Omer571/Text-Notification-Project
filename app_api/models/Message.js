// jshint esversion: 8
let mongoose = require('mongoose');

// message schema
const MessageSchema = mongoose.Schema({
  body: String
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
