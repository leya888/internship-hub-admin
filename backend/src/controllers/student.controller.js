
const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.level) {
    res.status(400).send({
      message: "Content cannot be empty! Required fields: firstName, lastName, email, level"
    });
    return;
  }

  // Create a Student
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    level: req.body.level,
    phoneNumber: req.body.phoneNumber,
  };

  // Save Student in the database
  Student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  const level = req.query.level;
  var condition = level ? { level: { [Op.eq]: level } } : null;

  Student.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Student with id=" + id
      });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Student.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Student with id=" + id
      });
    });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Student.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id
      });
    });
};

// Get students by level type (for internship assignment)
exports.findByLevel = (req, res) => {
  const level = req.params.level;
  let condition;
  
  switch(level) {
    case 'initiation':
      condition = { level: '1ere TI' };
      break;
    case 'perfectionnement':
      condition = { 
        level: { 
          [Op.or]: ['2eme DSI', '2eme MDW'] 
        } 
      };
      break;
    case 'pfe':
      condition = { 
        level: { 
          [Op.or]: ['3eme DSI', '3eme MDW'] 
        } 
      };
      break;
    default:
      return res.status(400).send({
        message: "Invalid level type. Must be one of: initiation, perfectionnement, pfe"
      });
  }

  Student.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving students."
      });
    });
};
