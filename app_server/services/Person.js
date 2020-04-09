// jshint esversion: 6

class Person {
  constructor(name, phoneNumber) {
    this.name = name;
    this.phoneNumber = phoneNumber;
  }

  getName() {
    return this.name;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

}

module.exports = Person;
