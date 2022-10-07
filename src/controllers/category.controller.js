const Category = require("../models/Category");

const categoryContoller = {
  // GET ALL
  getAll: async (_, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // GET ONE
  getOneById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  // POST ONE
  postOne: async (req, res) => {
    const category = new Category({
      name: req.body.name,
    });
    try {
      const newCategory = await category.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = categoryContoller;
