// jshint esversion: 6

const express = require('express');
const router = express.Router();
console.log('Current directory (index.js): ' + process.cwd());
const ctrlMessages = require('./app_api/controllers/groups');
// const ctrlReviews = require('../controllers/reviews');

// group
// router
//   .route('/locations')
//   .get(ctrlLocations.locationsListByDistance)
//   .post(ctrlLocations.locationsCreate);
//
// router
//   .route('/locations/:locationid')
//   .get(ctrlLocations.locationsReadOne)
//   .put(ctrlLocations.locationsUpdateOne)
//   .delete(ctrlLocations.locationsDeleteOne);

module.exports = router;
