$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    
    $.get("/api/user_data").then(function(data) {
      $(".dropdown-toggle").text("Welcome, " + data.firstName);
      $(".dropdown-toggle").append("<b class='caret'></b>");
      window.sessionStorage.setItem("user", JSON.stringify(data));
    });
  
    var user = JSON.parse(window.sessionStorage.getItem("user"));
    var userId = user.id; 
    var resourcesList = $("tbody");
    var container = $("container");
  
    function createResourceRow(resourceData) {
      var newTr = $("<tr>");
      newTr.data(resourceData);
      newTr.append("<td>" + resourceData.firstName + ' ' + resourceData.lastName + "</td>");
      newTr.append("<td> " + resourceData.link + "</td>");
      newTr.append("<td> " + resourceData.description + "</td>");     
      return newTr;
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
  
    // A function for rendering the list of authors to the page
    function renderResourceList(rows) {
      if (rows.length) {
        resourcesList.prepend(rows);
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
      container.append(alertDiv);
    }
  
    getSharedResources(userId);
  
  });
  
  
  
  