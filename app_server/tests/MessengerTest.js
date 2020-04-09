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

  // // Test
  // let test = new Messenger(myNumber, accountSid, authToken);
  // // testThing.testNameValidation();
  // test.makeGroupCollection("Adult Sanda Class");
  // test.makeGroupCollection("Kids Class (Parents)");
  // test.makeGroupCollection("Adult Brazilian Jui Jitsu Class");
