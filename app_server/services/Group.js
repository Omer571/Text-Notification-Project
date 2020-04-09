//jshint esversion: 6

class Group {
  constructor(groupName, peopleCollection, messagesCollection) {
    this.groupName = groupName;
    this.peopleCollection = peopleCollection;
    this.messagesCollection = messagesCollection;
  }

  getGroupName() {
    return this.groupName;
  }

  getPeopleCollection() {
    return this.peopleCollection;
  }

  getMessagesCollection() {
    return this.messagesCollection;
  }
}

module.exports = Group;
