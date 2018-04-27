 var db = require("../models");

 module.exports = function (app) {

     app.get("/api/resources/:userId", function (req, res) {
         db.Resource.findAll({
             //  include: [db.User],
             where: {
                 userId: req.params.userId,
             }
         }).then(function (dbResource) {
             res.json(dbResource);
         });
     });

     // Route for returning the public resources
     app.get("/api/resources/public", function (req, res) {
         db.Resource.findAll({
             where: {
                 isPublic: true
             }
         }).then(function (dbResource) {
             res.json(dbResource);
         });
     });

     app.get("/api/resources/:id/shared", function (req, res) {
         db.User.findById(req.params.id).then(function (user) {
             user.getResources().then(function (dbResource) {
                 res.json(dbResource);
             })
         });
     });

     // Route for adding the user's resources
     app.post("/api/resources", function (req, res) {
         console.log(req.body);
         db.Resource.create({
             topic: req.body.topic,
             link: req.body.link,
             description: req.body.description,
             isPublic: req.body.isPublic
         }).then(function () {
             res.redirect(307, "/api/resources");
         }).catch(function (err) {
             console.log(err);
             res.json(err);
             // res.status(422).json(err.errors[0].message);
         });
     });

     // DELETE route for deleting resources
     app.delete("/api/resources/:id", function (req, res) {
         db.Resource.destroy({
             where: {
                 id: req.params.id
             }
         }).then(function (dbResource) {
             res.json(dbResource);
         });
     });

     // PUT route for updating posts
     app.put("/api/resources", function (req, res) {
         db.Resource.update(
             req.body, {
                 where: {
                     id: req.body.id
                 }
             }).then(function (dbResource) {
             res.json(dbResource);
         });
     });


     // Route for adding the shared resources
     app.post("/api/resources/:id/shared", function (req, res) {
         db.User.findById(req.params.id).then(function (user) {
             user.addResources([req.body.resouceId]).then(function (dbResource) {
                 res.json(dbResource);
             })
         });
     });

     // Route for deleted the shared resources
     app.delete("/api/resources/:id/shared", function (req, res) {
         db.User.findById(req.params.id).then(function (user) {
             user.removeResources([req.body.resouceId]).then(function (dbResource) {
                 res.json(dbResource);
             })
         });
     });

 }