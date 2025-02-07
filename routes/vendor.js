const express = require("express");
const Vendor = require("../models/vendor");
const vendorRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

vendorRouter.post("/api/vendor/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingEmail = await Vendor.findOne({ email }); // Check if the email already exists
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Vendor with same email already exists" }); // Return an error message if the email already exists
    } else {
      const salt = await bcrypt.genSalt(10); // Generate a salt (a random string) with a cost factor of 10
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using the generated salt
      let vendor = new Vendor({ fullname, email, password: hashedPassword }); // Create a new vendor object
      vendor = await vendor.save(); // Save the vendor to the database
      res.json({ vendor }); // Return the user object
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// sign in api endpoint
vendorRouter.post("/api/vendor/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findVendor = await Vendor.findOne({ email }); // Find the Vendor by email

    if (!findVendor) {
      // Check jika Vendor tidak ditemukan
      return res
        .status(400)
        .json({ message: "Vendor Not Found with this Email!" }); // Return an error message if the email is invalid
    } else {
      // Check jika Vendor ditemukan
      const isMatch = await bcrypt.compare(password, findVendor.password); // Compare the password the Vendor sent with the hashed password

      // Compare the password with the hashed password
      if (!isMatch) {
        res.status(400).json({ message: "Incorrect Password!" }); // Return an error message if the password is invalid
      } else {
        const token = jwt.sign({ id: findVendor._id }, "passwordKey"); // Create a token
        const { password, ...vendorWithoutPassword } = findVendor._doc; // remove sensitive information (password)
        res.json({ token, vendor: vendorWithoutPassword }); // Send the responses
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = vendorRouter;
