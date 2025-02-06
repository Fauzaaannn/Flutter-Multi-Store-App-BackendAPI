const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// sign up api endpoint
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingEmail = await User.findOne({ email: email }); // Check if the email already exists
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" }); // Return an error message if the email already exists
    } else {
      const salt = await bcrypt.genSalt(10); // Generate a salt (a random string) with a cost factor of 10
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using the generated salt
      let user = new User({ fullname, email, password: hashedPassword }); // Create a new user object
      user = await user.save(); // Save the user to the database
      res.json({ user }); // Return the user object
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// sign in api endpoint
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email }); // Find the user by email

    if (!findUser) {
      // Check jika user tidak ditemukan
      return res
        .status(400)
        .json({ message: "User Not Found with this Email!" }); // Return an error message if the email is invalid
    } else {
      // Check jika user ditemukan
      const isMatch = await bcrypt.compare(password, findUser.password); // Compare the password the user sent with the hashed password

      // Compare the password with the hashed password
      if (!isMatch) {
        res.status(400).json({ message: "Incorrect Password!" }); // Return an error message if the password is invalid
      } else {
        const token = jwt.sign({ id: findUser._id }, "passwordKey"); // Create a token
        const { password, ...userWithoutPassword } = findUser._doc; // remove sensitive information (password)
        res.json({ token, user: userWithoutPassword }); // Send the responses
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
