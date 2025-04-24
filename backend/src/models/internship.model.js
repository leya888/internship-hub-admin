
module.exports = (sequelize, Sequelize) => {
  const Internship = sequelize.define("internship", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['initiation', 'perfectionnement', 'pfe']]
      }
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    room: {
      type: Sequelize.STRING,
      validate: {
        isIn: [
          ['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 
           'B101', 'B102', 'B103', 'B104', 'B105', 'B106', 'B107']
        ]
      }
    },
    description: {
      type: Sequelize.TEXT
    }
  });

  return Internship;
};
