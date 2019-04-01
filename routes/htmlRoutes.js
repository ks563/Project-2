// Dependencies
var db = require("../models");
var authorizeUser = require("../config/authorizeUser");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/home", authorizeUser, function(req, res) {
    res.render("eventCreation")
    // res.sendFile(path.join(__dirname, "../views/html/eventCreation.html"));

    console.log(req.user)
  });
  // Load login page
  app.get("/login", function(req, res) {
    res.render("login")
    // res.sendFile(path.join(__dirname, "../views/html/login.html"));
    
  });
  // Restart app login when finish session
  app.get("/logout", function(req, res) {
    res.render("login")
    // res.sendFile(path.join(__dirname, "../views/html/login.html"))
  });
  // Creating new user route
  app.get("/register", function(req, res) {
    res.render("register")
    // res.sendFile(path.join(__dirname, "../views/html/register.html"));
  });
  // Event guest page. Where guests select items to bring
  app.get("/event/:user-:eventname", function(req, res) {
    res.render("swipe", {
      user: req.params.user,
      eventname: req.params.eventname,
    })
    // res.sendFile(path.join(__dirname, "../views/html/swipe.html"));
  });
  // Home page for event required (?)
  app.get("/event/:id", authorizeUser, function(req, res) {

  });
  // Route to create a new event
  app.get("/event/create/:id", authorizeUser, function(req, res) {
    var eventId = req.params.id;
    req.body.eventId = eventId;
    res.render("addItems", {id: eventId});
    // res.sendFile(path.join(__dirname, "../views/html/additems.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
