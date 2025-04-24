
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./student.model.js")(sequelize, Sequelize);
db.teachers = require("./teacher.model.js")(sequelize, Sequelize);
db.internships = require("./internship.model.js")(sequelize, Sequelize);

// Define relationships
db.students.hasMany(db.internships, { as: "internships" });
db.internships.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student",
});

db.internships.belongsToMany(db.teachers, {
  through: "InternshipTeachers",
  as: "teachers",
  foreignKey: "internshipId",
});

db.teachers.belongsToMany(db.internships, {
  through: "InternshipTeachers",
  as: "internships",
  foreignKey: "teacherId",
});

module.exports = db;
