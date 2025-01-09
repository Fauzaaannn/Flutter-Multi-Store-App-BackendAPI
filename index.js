// import the express module
const express = require("express");
const mongoose = require("mongoose");

// Define the port number
const port = 3000;

// Create an instance of the express application
const app = express();
// Connect to MongoDB String
const DB =
  "mongodb+srv://fauzanabderrasheed:OjanMongoAtlas@cluster0.mci0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware

mongoose.connect(DB).then(() => {
  console.log("MongoDB Connection Successful");
});

// start the server and listen on specified port
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
