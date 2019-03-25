// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $resultImg = $(".result-image");
var $modal = $("#modal-selection");
var $modalBtn = $("#modal-submit");
// var customSearch = require("./custom-search");

// The API object contains methods for each kind of request we'll make

var API = {
  // saveExample: function(data) {
  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "api/event",
  //     data: JSON.stringify(data)
  //   });
  // },
  // getExamples: function() {
  //   return $.ajax({
  //     url: "api/examples",
  //     type: "GET"
  //   });
  // },
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // },
  customSearch: function(searchTerm){
    return $.ajax({
      url: "/api/" + searchTerm,
      type: "GET"
    })
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  // customSearch("chips");
  var example = {
    search: $exampleText.val().trim(),
  };

  if (!(example.search)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.customSearch(example.search).then(function(data){
    console.log(data);
    
    for (var i = 1; i < data.length; i++)
    {
      var image = $("<img>");
      image.addClass("result-image");
      image.attr("src", data[i].pagemap.cse_thumbnail[0].src);
      $exampleList.append(image);
    }
  });


  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};
var handleSelection = function(){
  $("#modal-image").attr("src", $(this).attr("src"));
  $modal.modal("toggle");
  API.saveExample()
}
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$(document).on("click",".result-image", handleSelection);
$($modalBtn).on("click", saveExample);
