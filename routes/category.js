const express = require("express");
const Category = require("../models/category");

const categoryRouter = express.Router();

categoryRouter.post("/api/categories", async (req, res) => {
  try {
    const { name, image, banner } = req.body; // Destructuring the name, image, and banner from the request body
    const category = new Category({ name, image, banner }); // Create a new instance of the Category model
    await category.save(); // Save the category to the database
    return res.status(201).send(category); // Return the saved category
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

categoryRouter.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find(); // Find all categories in the database
    res.status(200).json( categories ); // Return the list of categories
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = categoryRouter;
