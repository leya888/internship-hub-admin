
const db = require("../models");
const Class = db.classes;
const Op = db.Sequelize.Op;

// Create and Save a new Class
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.level) {
    res.status(400).send({
      message: "Content cannot be empty! Required fields: name, level"
    });
    return;
  }

  // Create a Class
  const classObj = {
    name: req.body.name,
    level: req.body.level,
    specialization: req.body.specialization,
    description: req.body.description
  };

  // Save Class in the database
  Class.create(classObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Class."
      });
    });
};

// Retrieve all Classes from the database.
exports.findAll = (req, res) => {
  const level = req.query.level;
  var condition = level ? { level: { [Op.eq]: level } } : null;

  Class.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving classes."
      });
    });
};

// Find a single Class with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Class.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Class with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Class with id=" + id
      });
    });
};

// Update a Class by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Class.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Class was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Class with id=${id}. Maybe Class was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Class with id=" + id
      });
    });
};

// Delete a Class with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Class.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Class was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Class with id=${id}. Maybe Class was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Class with id=" + id
      });
    });
};

// Get classes by level
exports.findByLevel = (req, res) => {
  const level = req.params.level;
  
  if (!['1ere', '2eme', '3eme'].includes(level)) {
    return res.status(400).send({
      message: "Invalid level. Must be one of: 1ere, 2eme, 3eme"
    });
  }

  Class.findAll({ where: { level: level } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving classes."
      });
    });
};
