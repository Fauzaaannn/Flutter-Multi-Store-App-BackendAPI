const express = require("express");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingEmail = await User.findOne({ email: email }); // Check if the email already exists
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" }); // Return an error message if the email already exists
    } else {
      let user = new User({ fullname, email, password }); // Create a new user object
      user = await user.save(); // Save the user to the database
      res.json({ user }); // Return the user object
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
