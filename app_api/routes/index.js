// jshint esversion: 8

const express = require('express');
const router = express.Router();
console.log('Current directory (index.js): ' + process.cwd());
const ctrlGroup = require('../controllers/groups');
const ctrlPerson = require('../controllers/people');
const ctrlMessage = require('../controllers/messages');

// groups
router
  .route('/groups')
  .get(ctrlGroup.groupsReadAll)
  .post(ctrlGroup.groupsCreate)
  .delete(ctrlGroup.groupsDeleteAll);

router
  .route('/groups/:groupid')
  .get(ctrlGroup.groupsReadOne)
  .put(ctrlGroup.groupsUpdateOne)
  .delete(ctrlGroup.groupsDeleteOne);

// people
router
  .route('/groups/:groupid/people')
  .get(ctrlPerson.peopleReadAll)
  .post(ctrlPerson.peopleCreate)
  .delete(ctrlPerson.peopleDeleteAll);

router
  .route('/groups/:groupid/people/:personid')
  .get(ctrlPerson.peopleReadOne)
  .put(ctrlPerson.peopleUpdateOne)
  .delete(ctrlPerson.peopleDeleteOne);

// messages
router
  .route('/groups/:groupid/messages')
  .get(ctrlMessage.messagesReadAll)
  .post(ctrlMessage.messagesCreate)
  .delete(ctrlMessage.messagesDeleteAll);

router
  .route('/groups/:groupid/messages/:messageid')
  .get(ctrlMessage.messagesReadOne)
  .put(ctrlMessage.messagesUpdateOne)
  .delete(ctrlMessage.messagesDeleteOne);

module.exports = router;
