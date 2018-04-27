// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/my_view");
    // }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/myview");
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/resources", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/my_view.html"));
  });

  // cms route loads cms.html
  app.get("/new", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/add_resource.html"));
  });

  // blog route loads blog.html
  app.get("/shared", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/shared.html"));
  });

  // authors route loads author-manager.html
  app.get("/friends", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/add_friends.html"));
  });

};