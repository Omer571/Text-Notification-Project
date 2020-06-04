//  jshint esversion: 6
console.log('Current directory (test_app): ' + process.cwd());
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const apiRoutes = require('./app_api/routes/index');

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", apiRoutes);

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 3000");
  }
});
