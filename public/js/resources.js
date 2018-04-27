$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $(".member-name").text(data.email);
    window.sessionStorage.setItem( "user", JSON.stringify(data));
  });

  var user = JSON.parse(window.sessionStorage.getItem("user"));
  var userId = user.id; 

  function createResourceRow(resourceData) {
    var newTr = $("<tr>");
    newTr.data(resourceData);
    newTr.append("<td>" + resourceData.firstName + ' ' + resourceData.lastName + "</td>");
    newTr.append("<td> " + resourceData.link + "</td>");
    newTr.append("<td> " + resourceData.description + "</td>");     
    return newTr;
  }

  // Function for retrieving  resources and getting them ready to be rendered to the page
  function getResources(userId) {
    $.get("/api/resources/" + userId, function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createResourceRow(data[i]));
      }
      renderResourceList(rowsToAdd);
     });
  }

  // Function for retrieving public resources and getting them ready to be rendered to the page
  function getPublicResources() {
    $.get("/api/resources/public", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createResourceRow(data[i]));
      }
      renderResourceList(rowsToAdd);
     });
  }

  // Function for retrieving shared resources and getting them ready to be rendered to the page
  function getSharedResources(userId) {
    $.get("/api/resources/" + userId + "/shared", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createResourceRow(data[i]));
      }
      renderResourceList(rowsToAdd);
     });
  }

  var authorList = $("tbody");
  var authorContainer = $(".author-container");
 
  // A function for rendering the list of authors to the page
  function renderResourceList(rows) {
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no resources
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("Please create a resource.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("resource");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/resources/" + id
    })
      .then(getResources);
  }

getResources(userId);

});



