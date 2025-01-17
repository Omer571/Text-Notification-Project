//  jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const router = require("./router");

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use("/", router);

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 3000");
  }
});
