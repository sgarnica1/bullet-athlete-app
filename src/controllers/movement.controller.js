const Movement = require("../models/Movement");
const Category = require("../models/Category");
const ScoreType = require("../models/ScoreType")

const movementController = {
  // GET ALL
  getAll: async (_, res) => {
    try {
      const movements = await Movement.find();
      res.status(200).json(movements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // GET ONE
  getOneById: async (req, res) => {
    try {
      const movement = await Movement.findById(req.params.id);
      res.status(200).json(movement);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  // CREATE
  postOne: async (req, res) => {
    const movement = new Movement({
      name: req.body.name,
      category: req.body.category,
      scoretype: req.body.scoretype,
    });
    try {
      const savedMovement = await movement.save();
      
      // ADD MOVEMENT TO CATEGORY
      const movementCategory = await Category.findById(req.body.category)
      movementCategory.movements.push(savedMovement)
      await movementCategory.save()

      // ADD MOVEMENT TO SCORETYPE
      const movementScoreType = await ScoreType.findById(req.body.scoretype)
      movementScoreType.movements.push(movement)
      await movementScoreType.save()

      // RETURN DATA
      res.status(201).json(savedMovement);
    } catch (error) {
      res.status(400).json({ message: error.message, name: error.name });
    }
  },
};

module.exports = movementController;
