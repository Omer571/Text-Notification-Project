// jshint esversion: 8

const Message = require('../models/Message');

const messagesCreate = function(req, res) {

  if (req.params && req.params.groupid) {
    const groupid = req.params.groupid;
    if (req.body.messageBody) {
      const message = new Message({
        body: req.body.messageBody
      });

      Group.update(
        { _id: groupid },
        { $push: { messages: message } },
        ((err) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            res
              .status(201)
              .json(message);
          }
        })
      );

    } else {
      res
        .status(404)
        .json({
          "message": "No message was given to create message"
        });
    }
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, groupid required"
      });
    }
  };

const messagesReadAll= function(req, res) {
  if (req.params && req.params.groupid) {
    const groupid = req.params.groupid;
    Group.findOne({_id: groupId}, function(err, foundGroup) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else if (!foundGroup){
        res
          .status(404)
          .json({
            "message": "No group found for given groupid"
          });
      } else if (foundGroup.messages && foundGroup.messages.length) {
        res
          .status(200)
          .json(foundGroup.messages);
      } else {
        res
          .status(404)
          .json({
            "message": "No messages found in group"
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

const messagesDeleteAll = function(req, res) {
  if (!req.params || !req.params.groupid) {
    res
      .status(404)
      .json({
        "message": "Not found, groupid is required"
      });
  } else {
    const groupid = req.params.groupid;
    Group
      .findById(groupid)
      .select('messages')
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
        if (foundGroup.messages) {
          foundGroup.messages = [];
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
      });
  }


};

const messagesReadOne = function(req, res) {
  if (req.params && req.params.groupid && req.params.messageid) {
    const messageid = req.params.messageid;
    const groupid = req.params.groupid;

    Group
      .findById(groupid)
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

        if (foundGroup.messages && foundGroup.messages.length > 0) {
          const message = foundGroup.messages.id(messageid);
          if (!message) {
            res
              .status(404)
              .json({
                "message": "messageid not found"
              });
          } else {
          res
            .status(200)
            .json(message);
          }
        } else {
          res
            .status(404)
            .json({
              "message": "No messages found"
            });
        }
      });
  } else {
    res
      .status(404)
      .json({
        "message": "groupid or message id missing in request"
      });
  }


};

const messagesUpdateOne = function(req, res) {
  if (!req.params.groupid || !req.params.messageid || req.body.newMessage) {
    res
      .status(404)
      .json({
        "message": "Not found, groupid and messageid are both required"
      });
    return;
  }

  const groupid = req.params.groupid;
  const messageid = req.params.messageid;
  const newMessage = req.body.newMessage;

  Group
    .findById(groupid)
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

      if (foundGroup.messages && foundGroup.messages.length > 0) {

        let thisMessage = foundGroup.messages.id(messageid);
        if (!thisMessage) {
          res
            .status(404)
            .json({
              "message": "messageid not found"
            });
        } else {
          thisMessage.body = newMessage;
          foundGroup.save((err) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
              res
                .status(200)
                .json(thisMesssage);
            }
          });
        }

      } else {
        res
          .status(404)
          .json({
            "message": "No message to update"
          });
      }
    });
};

const messagesDeleteOne = function(req, res) {

  if (!req.params.groupid || !req.params.messageid) {
    res
      .status(404)
      .json({
        "message": "Not found, groupid and reviewid are both required"
      });
    return;
  }

  const groupid = req.params.groupid;
  const messageid = req.params.messageid;

  Group
    .findById(groupid)
    .populate("people")
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
      if (foundGroup.messages && foundGroup.messages.length > 0) {
        if (!foundGroup.messages.id(messageid)) {
          res
            .status(404)
            .json({
              "messsage": "messageid not found"
            });
        } else {
          foundGroup.messages.id(messageid).remove();
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
            "message": "No messages to delete"
          });
      }
    });
};

module.exports.messagesReadAll = messagesReadAll;
module.exports.messagesCreate = messagesCreate;
module.exports.messagesDeleteAll = messagesDeleteAll;

module.exports.messagesReadOne = messagesReadOne;
module.exports.messagesUpdateOne = messagesUpdateOne;
module.exports.messagesDeleteOne = messagesDeleteOne;
