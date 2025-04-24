
const db = require("../models");
const Internship = db.internships;
const Teacher = db.teachers;
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new Internship
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.company || !req.body.type || 
      !req.body.startDate || !req.body.endDate || !req.body.studentId) {
    res.status(400).send({
      message: "Required fields cannot be empty: title, company, type, startDate, endDate, studentId"
    });
    return;
  }

  try {
    // Verify the student exists and is of the appropriate level for the internship type
    const student = await Student.findByPk(req.body.studentId);
    
    if (!student) {
      return res.status(404).send({
        message: `Student with id=${req.body.studentId} not found.`
      });
    }

    // Check if student level matches internship type
    let validLevel = false;
    switch(req.body.type) {
      case 'initiation':
        validLevel = student.level === '1ere TI';
        break;
      case 'perfectionnement':
        validLevel = student.level === '2eme DSI' || student.level === '2eme MDW';
        break;
      case 'pfe':
        validLevel = student.level === '3eme DSI' || student.level === '3eme MDW';
        break;
    }

    if (!validLevel) {
      return res.status(400).send({
        message: `Student level (${student.level}) does not match internship type (${req.body.type}).`
      });
    }

    // Randomly select two teachers if not provided
    let teacherIds = req.body.teacherIds;
    if (!teacherIds || !Array.isArray(teacherIds) || teacherIds.length === 0) {
      const teachers = await Teacher.findAll();
      if (teachers.length < 2) {
        return res.status(400).send({
          message: "Not enough teachers available for random assignment."
        });
      }
      const shuffled = [...teachers].sort(() => 0.5 - Math.random());
      teacherIds = shuffled.slice(0, 2).map(t => t.id);
    }

    // Randomly select a room if not provided
    let room = req.body.room;
    if (!room) {
      const rooms = [
        'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 
        'B101', 'B102', 'B103', 'B104', 'B105', 'B106', 'B107'
      ];
      room = rooms[Math.floor(Math.random() * rooms.length)];
    }

    // Create the internship
    const internship = {
      title: req.body.title,
      company: req.body.company,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      room: room,
      description: req.body.description,
      studentId: req.body.studentId
    };

    // Save Internship in the database
    const createdInternship = await Internship.create(internship);
    
    // Associate teachers with the internship
    const teachersToAssociate = await Teacher.findAll({
      where: {
        id: {
          [Op.in]: teacherIds
        }
      }
    });
    
    await createdInternship.setTeachers(teachersToAssociate);
    
    // Return the created internship with its associations
    const result = await Internship.findByPk(createdInternship.id, {
      include: [
        {
          model: Student,
          as: "student"
        },
        {
          model: Teacher,
          as: "teachers",
          through: { attributes: [] } // exclude junction table
        }
      ]
    });
    
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Internship."
    });
  }
};

// Retrieve all Internships from the database.
exports.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { [Op.eq]: type } } : null;

  Internship.findAll({ 
    where: condition,
    include: [
      {
        model: Student,
        as: "student"
      },
      {
        model: Teacher,
        as: "teachers",
        through: { attributes: [] } // exclude junction table
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving internships."
      });
    });
};

// Find a single Internship with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Internship.findByPk(id, {
    include: [
      {
        model: Student,
        as: "student"
      },
      {
        model: Teacher,
        as: "teachers",
        through: { attributes: [] } // exclude junction table
      }
    ]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Internship with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Internship with id=" + id
      });
    });
};

// Update an Internship by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // Update the internship fields
    const [num] = await Internship.update(req.body, {
      where: { id: id }
    });
    
    if (num !== 1) {
      return res.send({
        message: `Cannot update Internship with id=${id}. Maybe Internship was not found or req.body is empty!`
      });
    }
    
    // If teacher IDs are provided, update the associations
    if (req.body.teacherIds && Array.isArray(req.body.teacherIds)) {
      const internship = await Internship.findByPk(id);
      const teachersToAssociate = await Teacher.findAll({
        where: {
          id: {
            [Op.in]: req.body.teacherIds
          }
        }
      });
      
      await internship.setTeachers(teachersToAssociate);
    }
    
    res.send({
      message: "Internship was updated successfully."
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Internship with id=" + id
    });
  }
};

// Delete an Internship with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Internship.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Internship was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Internship with id=${id}. Maybe Internship was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Internship with id=" + id
      });
    });
};

// Get internships by type
exports.findByType = (req, res) => {
  const type = req.params.type;
  
  if (!['initiation', 'perfectionnement', 'pfe'].includes(type)) {
    return res.status(400).send({
      message: "Invalid internship type. Must be one of: initiation, perfectionnement, pfe"
    });
  }

  Internship.findAll({ 
    where: { type: type },
    include: [
      {
        model: Student,
        as: "student"
      },
      {
        model: Teacher,
        as: "teachers",
        through: { attributes: [] } // exclude junction table
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving internships."
      });
    });
};
