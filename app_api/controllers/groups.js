// jshint esversion: 6

console.log('Current directory (group.js controller): ' + process.cwd());
const Group = require('../models/Group');
// TODO: Include model of deleted people which includes group

// creation methods

const addPerson = function(req, res) {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
    note: req.body.note
  });
  newPerson.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message Should be saved");
    }
  });
};

const addMessage = function(req, res) {
  const groupId = req.body.groupId;
  const message = new Message({
    body: req.body.messageBody
  });

  Group.update(
    { _id: groupId },
    { $push: { messages: message } }
  );
};

const changeGroupName = function(req, res) {
  const groupId = req.body.groupId;
  const newGroupName = req.body.newGroupName;
  const group = await Group.findOne({
    _id: groupId
  })
  .exec();

  group.name = newGroupName;
  await group.save();
};

// all methods

const getAllMessages = function(req, res) {
  const groupId = req.body.groupId;
  Group.findOne({_id: groupId}, function(err, foundGroup) {
    if (!err) {
      res.send(foundGroup.messages);
    } else {
      res.send(err);
    }
  });

};

const getAllPeople = function(req, res) {
  const groupId = req.body.groupId;
  Group.findOne({_id: groupId}, function(err, foundGroup) {
    if (!err) {
      res.send(foundGroup.people);
    } else {
      res.send(err);
    }
  });

  const deleteAllPeople = function(req, res) {
    const groupId = req.body.groupId;
    const group = await Group.findOne({
      _id: groupId
    })
    .exec();

    // TODO: Add deleted person to deleted person collection (with group attribute)
    group.people = [];
    await group.save();
  }

  const deleteAllMessages = function(req, res) {
    const groupId = req.body.groupId;
    const group = await Group.findOne({
      _id: groupId
    })
    .exec();

    group.messages = [];
    await group.save();
  }
};

// some methods


// single methods
