
module.exports = app => {
  const classes = require("../controllers/class.controller.js");
  var router = require("express").Router();

  // Create a new Class
  router.post("/", classes.create);

  // Retrieve all Classes
  router.get("/", classes.findAll);

  // Retrieve classes by level
  router.get("/byLevel/:level", classes.findByLevel);

  // Retrieve a single Class with id
  router.get("/:id", classes.findOne);

  // Update a Class with id
  router.put("/:id", classes.update);

  // Delete a Class with id
  router.delete("/:id", classes.delete);

  app.use('/api/classes', router);
};
