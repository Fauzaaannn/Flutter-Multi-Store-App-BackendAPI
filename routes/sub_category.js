const express = require("express");
const SubCategory = require("../models/sub_category");

const subcategoryRouter = express.Router();

subcategoryRouter.post("/api/subcategories", async (req, res) => {
  try {
    const { categoryId, categoryName, image, subCategoryName } = req.body; // Destructuring the name, image, and banner from the request body
    const subcategory = new SubCategory({
      categoryId,
      categoryName,
      image,
      subCategoryName,
    }); // Create a new instance of the Category model
    await subcategory.save(); // Save the category to the database
    return res.status(201).send(subcategory); // Return the saved category
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

subcategoryRouter.get(
  "/api/category/:categoryName/subcategories",
  async (req, res) => {
    try {
      // extract the categoryName from the request Url using Destructuring
      const { categoryName } = req.params;
      const subcategories = await SubCategory.find({
        categoryName: categoryName,
      }); // Find all subcategories in the database

      // check if any subcategories were found
      if (!subcategories || subcategories.length == 0) {
        return res.status(404).json({ msg: "No subcategories found" });
      } else {
        return res.status(200).json(subcategories);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

module.exports = subcategoryRouter;
