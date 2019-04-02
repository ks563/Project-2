// Dependencies
var db = require("../models");
var authorizeUser = require("../config/authorizeUser");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/home", authorizeUser, function(req, res) {
    res.render("eventCreation")
    //console.log(req.user)
  });
  // Load login page
  app.get("/login", function(req, res) {
    res.render("login")
    
  });
  // Restart app login when finish session
  app.get("/logout", function(req, res) {
    res.render("login")
    
  });
  // Creating new user route
  app.get("/register", function(req, res) {
    res.render("register")
    
  });
  // Event guest page. Where guests select items to bring
  app.get("/event/:user-:eventname", function(req, res) {
    res.render("swipe", {
      user: req.params.user,
      eventname: req.params.eventname,
    })
    
  });
  // Home page for event required (?)
  app.get("/event/:id", authorizeUser, function(req, res) {

  });
  // Route to create a new event
  app.get("/event/create/:id/:username/:eventname", authorizeUser, function(req, res) {
    var eventId = req.params.id;
    var username = req.params.username;
    var eventname = req.params.eventname;
    req.body.eventId = eventId;
    res.render("addItems", {
      id: eventId,
      username: username, 
      eventname: eventname
    });
    
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
