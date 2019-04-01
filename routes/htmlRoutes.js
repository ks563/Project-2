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
  app.get("/login", function(req, res) {
    res.render("login")
    // res.sendFile(path.join(__dirname, "../views/html/login.html"));
    
  });

  app.get("/logout", function(req, res) {
    res.render("login")
    // res.sendFile(path.join(__dirname, "../views/html/login.html"))
  });

  app.get("/register", function(req, res) {
    res.render("register")
    // res.sendFile(path.join(__dirname, "../views/html/register.html"));
  });
  app.get("/event/:user-:eventname", function(req, res) {
    res.render("swipe", {
      user: req.params.user,
      eventname: req.params.eventname,
    })
    // res.sendFile(path.join(__dirname, "../views/html/swipe.html"));
  });
  app.get("/event/:id", authorizeUser, function(req, res) {

  });
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
    // res.sendFile(path.join(__dirname, "../views/html/additems.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
