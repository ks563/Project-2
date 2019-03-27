var db = require("../models");
var authorizeUser = require("../config/authorizeUser");

module.exports = function(app) {
  // Load index page
  app.get("/home", authorizeUser, function(req, res) {
    res.render("eventCreation")
    console.log(req.user)
  });
  app.get("/login", function(req, res) {
    res.render("login")
    
  });
  app.get("/register", function(req, res) {
    res.render("register")
  });

  app.get("/event/:id",authorizeUser, function(req, res) {

  });
  app.get("/event/create/:id",authorizeUser, function(req, res) {
    res.render("addItems")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
