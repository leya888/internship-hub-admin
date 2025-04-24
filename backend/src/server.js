
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

// CORS configuration
var corsOptions = {
  origin: "http://localhost:5173" // Frontend URL
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database connection and sync
const db = require("./models");
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

// Simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to StageManager API." });
});

// Import routes
require("./routes/student.routes")(app);
require("./routes/teacher.routes")(app);
require("./routes/internship.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
