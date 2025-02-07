const express = require("express");
const Vendor = require("../models/vendor");
const vendorRouter = express.Router();

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
