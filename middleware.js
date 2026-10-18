const express = require("express");

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log("Request received!");
  next();
});

// Route
app.get("/", (req, res) => {
  res.send("Welcome to TORQUE RC!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});