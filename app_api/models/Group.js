// jshint esversion: 8
console.log('Current directory (Group.js - model): ' + process.cwd());

const connectToDB = async function() {
  console.log("Waiting for mongoose db");
  const mongoose = await require( './db' );
  console.log("Done Waiting");

  const beautifyUnique = require('mongoose-beautiful-unique-validation');

  // message schema
  const MessageSchema = mongoose.Schema({
    body: String
  });

  // person schema
  const PersonSchema = mongoose.Schema({
    name: {
      unique: "Name matches name of another.",
      required: true,
      type: String,
      lowercase: true
    },
    number: {
      required: true,
      type: String,
      unique: "Number already a part of contact. Search for number and delete " +
              "previous contact before adding new one."
    },
    group: String,
    note: String
  });
  PersonSchema.plugin(beautifyUnique); // for duplicate checking

  // group schema
  const GroupSchema = mongoose.Schema({
    name: {
      unique: "Name matches name of another Group.",
      required: true,
      type: String,
      lowercase: true
    },
    people: {
      // required: true,
      type: [PersonSchema]
    },
    messages: {
      // required: true,
      type: [MessageSchema]
    },
    note: String
  });

  GroupSchema.plugin(beautifyUnique);
  const Group = mongoose.model("Group", GroupSchema);
  module.exports = Group;
};

connectToDB();
