var db = require("../models");
var axios = require("axios")


module.exports = function(app) {
  // Get all examples
  app.get("/api/:search", function(req, res) {
    var url = "https://www.googleapis.com/customsearch/v1?key="+ process.env.API_KEY + "&cx=" + process.env.CSE_ID + "&q=" + req.params.search;
    axios.get(url).then(function(results){
      console.log(results.data.items);
      res.json(results.data.items);
    }).catch(function(err){
      console.log(err)
    })
  });

  // Create a new example
  app.post("/api/event/", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
