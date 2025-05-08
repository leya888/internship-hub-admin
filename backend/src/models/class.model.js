
module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    level: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['1ere', '2eme', '3eme']]
      }
    },
    specialization: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isIn: [['TI', 'DSI', 'MDW', null]]
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });

  return Class;
};
