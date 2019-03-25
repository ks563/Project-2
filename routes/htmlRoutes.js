var db = require("../models");
module.exports = function(app) {
  // Load index page
  app.get("/dashboard", function(req, res) {

  });
  app.get("/login", function(req, res) {

  });
  app.get("/register", function(req, res) {

  });

  app.get("/event/:id", function(req, res) {
    
  });
  app.get("/event/create/:id", function(req, res) {
    res.render("eventCreation")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
