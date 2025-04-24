
module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
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
    level: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['1ere TI', '2eme DSI', '2eme MDW', '3eme DSI', '3eme MDW']]
      }
    },
    phoneNumber: {
      type: Sequelize.STRING
    }
  });

  return Student;
};
