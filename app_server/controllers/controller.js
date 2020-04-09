//  jshint esversion: 6

exports.renderHomePage = (req, res) => {
  res.render("home");
};

exports.doFunction = (req, res) => {
  console.log(req);
  res.send("Your form has been submitted chutiya");
};
