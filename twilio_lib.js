// jshint esversion: 6

const accountSid = 'ACe0357ae6818b440fc8a28198623b89b5'; // Your Account SID from www.twilio.com/console
const authToken = '7f687fa638b2c1980540f85c86246d67';   // Your Auth Token from www.twilio.com/console
const twilio = require('twilio');
const Person = require('./Person.js');
const myNumber = '+12055089836';
let message = "Welcome to fags Anonymous. You will now receive unsolicited dick pics weekly. Thank you for subscribing.";
const groupName = "Fags Anonymous";

let person1 = new Person("Elijah", '+12547236398');
let person3 = new Person("Elijah", "+2547236398");
let person4 = new Person("Elijah", "12547236398");
let person5 = new Person("Elijah", "2547236398");
let person2 = new Person("Brandon", "+12542922128");

// function needed
// Shows history of messages sent
// Compose Message
// Send Message
// Show Numbers
// Add number
// Remove Number

let client = new twilio(accountSid, authToken);

// client.messages.create({
//     body: 'Hello from Node',
//     to: '2817366840',  // Text this number
//     from: '+12055089836' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));

class Helper {
  constructor(fromNumber, accountSid, authToken) {
    this.client = new twilio(accountSid, authToken);
    this.number = fromNumber;
    this.accountSid = accountSid;
    this.authToken = authToken;
  }

  displayPeople(groupOfPeople, res) {
    res.send(groupOfPeople);
  }

  testMessage(person, message, groupName) {
    this.client.messages.create({
        body: message,
        to: person.getPhoneNumber(),  // Text this number person.getPhoneNumber()
        from: this.number // From a valid Twilio number
    }).then((message) => console.log(message.sid));
  }

  sendMessage(groupOfPeople, message) {
    groupOfPeople.forEach(function(person) {
      this.client.messages.create({
        body: message,
        to: person.getPhoneNumber(),
        from: this.number
      });
    });
  }

}

let testThing = new Helper(myNumber, accountSid, authToken);
testThing.testMessage(person2, message, groupName);
