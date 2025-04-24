
const db = require("../models");
const Teacher = db.teachers;
const Op = db.Sequelize.Op;

// Create and Save a new Teacher
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    res.status(400).send({
      message: "Content cannot be empty! Required fields: firstName, lastName, email"
    });
    return;
  }

  // Create a Teacher
  const teacher = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    department: req.body.department,
    specialty: req.body.specialty
  };

  // Save Teacher in the database
  Teacher.create(teacher)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Teacher."
      });
    });
};

// Retrieve all Teachers from the database.
exports.findAll = (req, res) => {
  const department = req.query.department;
  var condition = department ? { department: { [Op.eq]: department } } : null;

  Teacher.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teachers."
      });
    });
};

// Find a single Teacher with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teacher.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Teacher with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Teacher with id=" + id
      });
    });
};

// Update a Teacher by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Teacher.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Teacher was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Teacher with id=" + id
      });
    });
};

// Delete a Teacher with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Teacher.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Teacher was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Teacher with id=" + id
      });
    });
};

// Get random teachers
exports.getRandom = (req, res) => {
  const count = req.query.count || 2;

  Teacher.findAll()
    .then(data => {
      if (data.length < count) {
        return res.status(400).send({
          message: `Not enough teachers available. Requested ${count}, but only ${data.length} exist.`
        });
      }

      // Shuffle the array and take the first 'count' elements
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      res.send(shuffled.slice(0, count));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teachers."
      });
    });
};
