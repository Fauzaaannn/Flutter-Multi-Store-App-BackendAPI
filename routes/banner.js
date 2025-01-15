const express = require("express");
const Banner = require("../models/banner");

const bannerRouter = express.Router();

bannerRouter.post("/api/banner", async (req, res) => {
  try {
    const { image } = req.body; // Destructuring the image from the request body
    const banner = new Banner({ image }); // Create a new instance of the Banner model
    await banner.save(); // Save the banner to the database
    return res.status(201).send(banner); // Return the saved banner
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = bannerRouter;