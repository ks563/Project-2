// Get references to page elements
var $itemName = $("#party-item");
var $itemDescription = $("#item-descrip");
var $itemSubmitBtn = $("#item-submit");
var $itemArea = $("#item-area");
var $resultImg = $(".result-image");

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
      url: "/api/search/" + searchTerm,
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
  var item = {
    search: $itemName.val().trim(),
  };

  if (!(item.search)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.customSearch(item.search).then(function(data){
    console.log(data);
    
    for (var i = 1; i < data.length; i++)
    {
      var image = $("<img>");
      image.addClass("result-image");
      image.attr("src", data[i].pagemap.cse_thumbnail[0].src);
      $itemArea.append(image);
    }
  });


  // $exampleText.val("");
  // $exampleDescription.val("");
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
  API.saveExample()
}
// Add event listeners to the submit and delete buttons
$itemSubmitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
$(document).on("click",".result-image", handleSelection);
