// jshint esversion: 8

console.log('Current directory (group.js controller): ' + process.cwd());

const mongoose = require('mongoose');
const ctrl = require('../models/Group');
const Group = ctrl.Group;

// Only takes groupName from request body
const groupsCreate = function(req, res) {
  if (req.body.groupName) {
    console.log(req.body);
    let groupName = req.body.groupName;
    let groupNote = req.body.groupNote;

    Group.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.groupName,
      // people: [],
      // messages: [],
      note: req.body.groupNote,
      // deletedPeople: []
    }, function(err, group) {
        if (err) {
          console.log(err);
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(201)
            .json(group);
        }
      }
    );

  } else {
    res
      .status(404)
      .json({
        "message": "No group name specified"
      });
  }

};

const groupsReadAll = function(req, res) {
  Group
    .find()
    .exec((err, foundGroups) => {
      if (!foundGroups) {
        res
          .status(404)
          .json({
            "message": "No groups"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      } else {
        res
          .status(200)
          .json(foundGroups);
      }
    });
};

const groupsDeleteAll = function(req, res) {
  Group.remove({}, function(err) {
    if (err) {
      res
        .status(404)
        .json(err);
    }
    res
      .status(204)
      .json(null);
  });
};

const groupsReadOne = function(req, res) {
  if (req.params && req.params.groupid) {
    Group
      .findById(req.params.groupid)
      .exec((err, foundGroup) => {
        if (!foundGroup) {
          res
            .status(404)
            .json({
              "message": "groupid not found"
            });
          return;
        } else if (err) {
          res
            .status(400)
            .json(err);
          return;
        }
        if (foundGroup) {
          res
            .status(200)
            .json(foundGroup);
        }
      });
  } else {
    res
    .status(404)
    .json({
      "message": "No groupid in request"
    });
  }
};

const groupsUpdateOne = function(req, res) {
  if (!req.params || !req.params.groupid) {
    res
      .status(404)
      .json({
        "message": "Not found, groupid is required"
      });
    return;
  }

  Group
    .findById(req.params.groupid)
    .exec((err, foundGroup) => {
      if (!foundGroup) {
        res
          .json(404)
          .status({
            "message": "groupid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }

      if (req.body.groupName)
        foundGroup.name = req.body.groupName;
      if (req.body.groupPeople)
        foundGroup.people = req.body.groupPeople;
      if (req.body.groupMessages)
        foundGroup.messages = req.body.groupMessages;
      if (req.body.groupNote)
        foundGroup.note = req.body.groupNote;

      foundGroup.save((err, group) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(200)
            .json(group);
        }
      });

    });
};

const groupsDeleteOne = function(req, res) {
  const groupid = req.params.groupid;
  if (groupid) {
    Group
      .findByIdAndRemove(groupid)
      .exec((err, foundGroup) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(204)
            .json(null);
        }
      });
  } else {
    res
      .status(404)
      .json({
        "message": "No groupid"
      });
  }
};


module.exports.groupsReadAll = groupsReadAll;
module.exports.groupsCreate = groupsCreate;
module.exports.groupsDeleteAll = groupsDeleteAll;

module.exports.groupsReadOne = groupsReadOne;
module.exports.groupsUpdateOne = groupsUpdateOne;
module.exports.groupsDeleteOne = groupsDeleteOne;
