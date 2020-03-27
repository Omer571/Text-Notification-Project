//  jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Tell app to use ejs
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

app.get("/", function(req, res) {
  res.render("list");
});

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 3000");
  }
});
