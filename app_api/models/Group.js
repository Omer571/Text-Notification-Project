// jshint esversion: 8

require('./db');
let mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

// const beautifyUnique = require('mongoose-beautiful-unique-validation');
const arrayUniquePlugin = require('mongoose-unique-array');

// person schema
const PersonSchema = mongoose.Schema({
  name: {
    unique: "Name matches name of another. Please differentiate names or " +
            "simply as this person into another group",
    required: true,
    type: String,
    lowercase: true
  },
  number: {
    // required: true,
    type: String,
    unique: "Number already a part of contact. Search for number and delete " +
            "previous contact before adding new one."
  },
  email: {
    type: String,
    // We are going to test this to see if email can be reused for person in different groups
    unique: "Email has been used for another person"
  },
  note: String,
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});

PersonSchema.plugin(beautifyUnique);
const Person = mongoose.model("Person", PersonSchema);
module.exports.Person = Person;


// group schema
const GroupSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    unique: "Name matches name of another Group.",
    required: true,
    type: String,
    lowercase: true
  },
  people: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
  note: String,
  deletedPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person'}]
});

GroupSchema.plugin(arrayUniquePlugin);
// GroupSchema.plugin(beautifyUnique);

const Group = mongoose.model("Group", GroupSchema);
module.exports.Group = Group;
