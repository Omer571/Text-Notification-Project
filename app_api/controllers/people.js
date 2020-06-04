// jshint esversion: 8

// const Person = require('../models/Person');
const ctrl = require('../models/Group');
const Person = ctrl.Person;
const Group = ctrl.Group;

const peopleCreate = function(req, res) {
  if (req.params.groupid && req.body.personName) {
    const groupid = req.params.groupid;
    const newPerson = new Person({
      name: req.body.personName,
      group: req.params.groupid
    });

    if (req.body.number)
      newPerson.number = req.body.number;
    if (req.body.email)
      newPerson.email = req.body.email;
    if (req.body.note)
      newPerson.note = req.body.note;

    Group.update(
      { _id: groupid },
      { $push: { people: newPerson } },
      function(err) {
        if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        res
          .status(201)
          .json(newPerson);
      }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, groupid required"
      });
  }
};

function _sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const peopleReadAll = function(req, res) {
  if (req.params && req.params.groupid) {
    const groupid = req.params.groupid;
    Group
      .findById(groupid)
      .populate({
        path: 'people',
        model: 'Person'
      })
      .exec((err, foundGroup) => {
        // _sleep(5000);
        if (!foundGroup) {
          res
            .status(404)
            .json({
              "message": "Group with this groupid not found"
            });
        } else if (err) {
          res
            .status(400)
            .json(err);
        }
        if (foundGroup.people && foundGroup.people.length > 0) {
          res
            .status(200)
            .json(foundGroup.people);
        } else {
          res
            .status(404)
            .json({
              "message": "No people found in group"
            });
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

const peopleDeleteAll = function(req, res) {
  if (!req.params || !req.params.groupid) {
      res
        .status(404)
        .json({
          "message": "Not found, groupid and personid"
        });
      return;
  }

  const groupid = req.params.groupid;

  Group
    .findById(groupid)
    .select('people')
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

      if (!foundGroup.people || (foundGroup.people.length <= 0)) {
        res
          .status(404)
          .json({
            "message": "No people found in group"
          });
      } else {

        // Add each person to deletedPerson before deleting
        foundGroup.people.forEach((person) => {
          // Check for duplicate error to be thrown
          try {
            foundGroup.deletedPeople.push(person);
          }
          catch(err) {
            // TODO: after checking the type of error
            console.log(err);
            console.log("This person is already in deletedPerson array");
          }
        });

        // Clear people attribute and save
        foundGroup.people = [];
        foundGroup.save((err) => {
          if (err) {
            res
              .status(404)
              .json(err);
          } else {
            res
              .status(204)
              .json(null);
          }
        });

      }
    });

};

// This should be in app_server controller. The api should return all people and then
// names are iterated through and text matching is performed
const peopleReadOne = function(req, res) {

  if (req.params && req.params.groupid && req.params.personid) {
    const groupid = req.params.groupid;
    const personid = req.params.personid;

    Group
      .findById(groupid)
      // .populate({
      //      path: 'people',
      //      populate: {
      //        path: 'people.group'
      //      }
      //      // model: 'Person' TODO: Made change here
      //  })
      .exec(function(err, foundGroup) {
        // await foundGroup.populate("people").execPopulate();
        let response = foundGroup.people;
        res.send(response);

        // await foundGroup.populate( 'people' ).execPopulate(console.log(foundGroup.people));
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

        // if (foundGroup.people && foundGroup.people.length > 0) {
        //   let person = foundGroup.people._id(personid);
        //   if (!person) {
        //     res
        //       .status(404)
        //       .json({
        //         "message": "personid not found"
        //       });
        //   } else {
        //     response = {
        //       person : {
        //         name : person.name,
        //         id : req.params.personid
        //       },
        //       group : group
        //     };
        //     res
        //       .status(200)
        //       .json(response);
        //   }
        // } else {
        //   res
        //     .status(404)
        //     .json({
        //       "message": "No people found"
        //   });
        // }
    });
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, groupid and personid are both required"
      });
  }
};

const peopleUpdateOne = function(req, res) {
  if (!req.params.groupid || !req.params.personid) {
    res
      .status(404)
      .json({
        "message": "Not found, groupid and personid are both required"
      });
    return;
  }
  Group
    .findById(req.params.groupid)
    .select('people')
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
      if (foundGroup.people && foundGroup.people.length > 0) {
        let thisPerson = group.people.id(req.params.personid);
        if (!thisPerson) {
          res
            .status(404)
            .json({
              "message": "personid not found"
            });
        } else {
          thisPerson.name = req.body.personName;
          thisPerson.number = req.body.personNumber;
          thisPerson.email = req.body.personEmail;
          thisPerson.note = req.body.personNote;
          foundGroup.save((err) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              res
                .status(200)
                .json(thisPerson);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No person to update"
          });
      }
    }
  );
};

const peopleDeleteOne = function() {
  if (!req.params || !req.params.groupid || !req.params.personid) {
    res
      .status(404)
      .json({
        "message": "Not found, groupid and person id are both required"
      });
    return;
  }

  const groupid = req.params.groupid;
  const personid = req.params.personid;

  Group
    .findById(groupid)
    .select('people')
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
      if (foundGroup.people && foundGroup.people.length > 0) {
        if (!foundGroup.people.id(personid)) {
          res
            .status(404)
            .json({
              "message": "personid not found"
            });
        } else {
          // Check for duplcate error if person is already in deletedPerson array
          let person = foundGroup.people.id(personid);
          try {
            group.deletedPeople.push(person);
          }
          catch(e) {
            // TODO: after checking the type of error
            console.log(err);
            console.log("This person is already in deletedPerson array");
          }

          foundGroup.people.pull({ _id: personid});

          foundGroup.save((err) => {
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
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No people in group to delete"
          });
      }
    });

};

module.exports.peopleReadAll = peopleReadAll;
module.exports.peopleCreate = peopleCreate;
module.exports.peopleDeleteAll = peopleDeleteAll;

module.exports.peopleReadOne = peopleReadOne;
module.exports.peopleUpdateOne = peopleUpdateOne;
module.exports.peopleDeleteOne = peopleDeleteOne;
