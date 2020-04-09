//  jshint esversion: 6

const controller = require("./controllers/controller");
const express = require("express");
const router = express.Router();

router.get("/", controller.renderHomePage);
router.post("/", controller.doFunction);

module.exports = router;
