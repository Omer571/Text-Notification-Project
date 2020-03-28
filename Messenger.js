// jshint esversion: 6
require('dotenv').config();
const accountSid = 'ACe0357ae6818b440fc8a28198623b89b5'; // Your Account SID from www.twilio.com/console
const authToken = '7f687fa638b2c1980540f85c86246d67';   // Your Auth Token from www.twilio.com/console
const twilio = require('twilio');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoose = require("mongoose");
const Person = require('./Person.js');
const myNumber = '+12055089836';

const groupName = "Group";
let person1 = new Person(process.env.TEST_NAME, process.env.TEST_NUMBER);

// function needed
// Shows history of messages sent
// Compose Message (CHECK)
// Send Message (CHECK)
// Show Numbers
// Add number
// Remove Number

let client = new twilio(accountSid, authToken);

class Messenger {
  constructor(fromNumber, accountSid, authToken) {
    this.client = new twilio(accountSid, authToken);
    this.number = fromNumber;
    this.accountSid = accountSid;
    this.authToken = authToken;

    this.setUpPersonCollection();
    this.setUpMessageCollection();
  }

  setUpPersonCollection() {
    const Schema = mongoose.Schema;
    mongoose.connect("mongodb://localhost:27017/notificationDB", {useNewUrlParser: true});

    const personSchema = new Schema({
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
      }
    });
    personSchema.plugin(beautifyUnique);

    this.Person = mongoose.model("Person", personSchema);
  }

  setUpMessageCollection() {
    const Schema = mongoose.Schema;
    // mongoose.connect("mongodb://localhost:27017/notificationDB", {useNewUrlParser: true});

    const messageSchema = new Schema({
      message: String
    });

    this.Message = mongoose.model("Message", messageSchema);
  }

  sendMessage(groupOfPeople, message) {
    for (let person of groupOfPeople) {
      this.client.messages.create({
        body: message,
        to: person.getPhoneNumber(),
        from: this.number
      });
    }

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

//   // Test sending messages
//   testMessage(person, message, groupName) {
//     this.client.messages.create({
//         body: message,
//         to: person.getPhoneNumber(),  // Text this number person.getPhoneNumber()
//         from: this.number // From a valid Twilio number
//     }).then((message) => console.log(message.sid));
//   }
//
  // // Test name validation
  // testNameValidation() {
  //   // Wait for the indexes to be created before creating any document
  //   this.Person.on('index', err => {
  //     if (err) {
  //         console.error('Indexes could not be created:', err);
  //         return;
  //     }
  //
  //     // Create two conflicting documents
  //     const admin1 = new this.Person({
  //         name: 'admin',
  //         number: '1'
  //     });
  //
  //     const admin2 = new this.Person({
  //         name: 'admin2',
  //         number: '1'
  //     });
  //
  //     admin1.save()
  //         .then(() => console.log('Success saving admin1!'))
  //         .catch(err => console.error("Admin1", err.errors.number.message));
  //
  //     admin2.save()
  //         .then(() => console.log('Success saving admin2!'))
  //         .catch(err => console.error("Admin2", err.errors.number.message));
  //   });
  //
  // }

}

// Test
// let testThing = new Messenger(myNumber, accountSid, authToken);
// testThing.testNameValidation();
// testThing.sendMessage([person1], "hi");
