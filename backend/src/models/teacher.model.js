
module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define("teacher", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    department: {
      type: Sequelize.STRING
    },
    specialty: {
      type: Sequelize.STRING
    }
  });

  return Teacher;
};
