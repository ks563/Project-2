// Get references to page elements
var $itemName = $("#party-item");
var $itemDescription = $("#item-descrip");
var $itemSubmitBtn = $("#item-submit");
var $itemArea = $("#item-area");
var $resultImg = $(".result-image");
var $eventId = $("#event").attr("data-id");

// var customSearch = require("./custom-search");

// The API object contains methods for each kind of request we'll make

var API = {
  getEvents: function() {
    return $.ajax({
      url: "/api/events/find",
      type: "GET"
    });
  },
  getItems: function(eventId){
    return $.ajax({
      url: "/api/event/find/item/" + eventId,
      type: "GET"
    })
  },

  customSearch: function(searchTerm){
    return $.ajax({
      url: "/api/search/" + searchTerm,
      type: "GET"
    })
  },
  saveSelection: function(data){
    return $.ajax({
      url: "/api/event/add",
      type: "POST",
      data: data
    })
  }
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
    $("#item-area").empty();

    for (var i = 1; i < data.length; i++)
    {
      var card = "<div class='card item' style='width: 18rem; transform: translateY(20*"+i+"px); display: inline-block; overflow: hidden; position: absolute'><img class='card-img-top' src="+data[i].pagemap.cse_thumbnail[0].src+"></div>";

      $itemArea.prepend(card);
    }
  
      var $image = document.querySelectorAll(".item");
      $image.forEach(function(item) {
          var hammer = new Hammer(item)
          hammer.on("swipeleft", function(){
          item.classList.add("animated", "slideOutLeft")
          })
          hammer.on("swiperight", function(){
            item.classList.add("animated", "slideOutRight")
            handleSelection(item)
          })
        })
  });

};
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};
var handleSelection = function(item){
  console.log(item)
  var imglink = $(item).find("img").attr("src");
  console.log(imglink)
  var name = $("#party-item").val().trim();
  var description = $("#item-descrip").val().trim();
  var data = {
    event_id: $eventId,
    item: name,
    image_link: imglink,
    description: description
  }
  API.saveSelection(data);
}
var showEventLink = function(){
  var protocol = window.location.protocol;
  var host = window.location.host;
  var username = $("#event").data("username");
  var eventname = $("#event").data("eventname");
  var url = protocol + "//" + host + "/event/" + username + "-" + eventname;
  $("#event").attr("href", url);
  $("#event").text("Event Link: " + url);
}

var showPastEvents = function(){
  API.getEvents().then(function(data){ 
    var events = data;
    for(let i = 0; i <data.length; i++)
    {
      
      API.getItems(data[i].id).then(function(results){

        var pTag = $("<p>");
        var anchor = $("<a>");
        var btn = $("<button>");
        var eventInfo = $("<div>");
        var eventCollaspe = $("<div>");
        var table = $("<table>");
        btn.text(data[i].name);
        btn.addClass("btn btn-primary");
        btn.attr("type", "button");
        btn.attr("data-toggle", "collapse");
        btn.attr("data-target", "#eventInfo-"+i);
        btn.attr("aria-expanded", false);
        btn.attr("aria-controls", "eventInfo-"+i);
        eventInfo.addClass("collapse");
        eventInfo.attr("id", "eventInfo-"+i);
        eventCollaspe.addClass("card card-body");
        pTag.append(btn);
        table.append("<tr><th>Item Name</th><th>Bought</th></tr>")
        for(let j = 0; j < results.length; j++)
        {
          table.append("<tr><td>" + results[j].item +"</td><td>" + results[j].isBrought+"</td></tr>");
        }
        eventInfo.append(eventCollaspe);
        eventCollaspe.append(table);
        $("#past-events").append(pTag);
        $("#past-events").append(eventInfo);
      })
    }
  })
}

showPastEvents();
showEventLink();

// Add event listeners to the submit and delete buttons
$itemSubmitBtn.on("click", handleFormSubmit);

$(document).on("click",".result-image", handleSelection);

// Clear Item search area

$("#clear").click(function(event) {
  event.preventDefault();

  $("#party-item").value("");
  $("#item-descrip").value("");
  $("#item-area").value('');
})