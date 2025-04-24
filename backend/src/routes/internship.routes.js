
module.exports = app => {
  const internships = require("../controllers/internship.controller.js");
  var router = require("express").Router();

  // Create a new Internship
  router.post("/", internships.create);

  // Retrieve all Internships
  router.get("/", internships.findAll);

  // Retrieve internships by type
  router.get("/byType/:type", internships.findByType);

  // Retrieve a single Internship with id
  router.get("/:id", internships.findOne);

  // Update an Internship with id
  router.put("/:id", internships.update);

  // Delete an Internship with id
  router.delete("/:id", internships.delete);

  app.use('/api/internships', router);
};
