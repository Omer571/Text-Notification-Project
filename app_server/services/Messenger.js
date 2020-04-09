// jshint esversion: 6
require('dotenv').config();

const twilio = require('twilio');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoose = require("mongoose");
const Person = require('./Person.js');
const Group = require('./Group.js');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;

let person1 = new Person(process.env.TEST_NAME, process.env.TEST_NUMBER);

// function needed
// 1. setUpGroupCollection
//    - function to set up and return message collection
// 2. Add person to group
// 3. Remove person from group (choice to keep person in miscallanous)
// 3. composeMessage
// 4. sendMessage
// 5. showMessageHistory(groupName)
// 6. displayPeopleInGroup

let client = new twilio(accountSid, authToken);

class Messenger {
  constructor(fromNumber, accountSid, authToken) {
    this.client = new twilio(accountSid, authToken);
    this.number = fromNumber;
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.groups = []; // Needs to be a collection

    mongoose.connect("mongodb://localhost:27017/notificationDB", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

  }

  makeGroupCollection(groupName) {

    this.groups.push(
      new Group(
        groupName,
        mongoose.model('Person'),
        mongoose.model('Message')
      ));

    console.log(this.groups);
  }

  sendMessage(groupName, message) {
    // Find group object

    // For all numbers in group object send message
    this.client.messages.create({
      body: message,
      to: person.getPhoneNumber(),
      from: this.number
    });

    // Add message to group object collection
    this.addMessageToCollection(message, this.Message);
  }

  composeMessage(messageContent, header = "", footer = "") {
    const wholeMessage = header + "\n" + messageContent + "\n" + footer;
    return wholeMessage;
  }

  addMessageToCollection(message, dataBase) {
    let messageToAdd = new this.Message({message: message});
    messageToAdd.save(function(err){
      if (err) {
        console.log(err);
      } else {
        console.log("Message Saved");
      }
    });
  }

  displayPeople(groupOfPeople, res) {
    res.send(groupOfPeople);
  }

}
