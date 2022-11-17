const ScoreType = require("../models/ScoreType");

const scoreTypeController = {
  // GET ALL
  getAll: async (_, res) => {
    try {
      const scoreTypes = await ScoreType.find();
      res.status(200).json(scoreTypes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // GET ONE
  getOneById: async (req, res) => {
    try {
      const scoreType = await scoreType.findById(req.params.id);
      res.status(200).json(scoreType);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  // CREATE ONE
  postOne: async (req, res) => {
    const scoreType = new ScoreType({
      name: req.body.name,
    });

    try {
      const newScoreType = await scoreType.save();
      res.status(201).json(newScoreType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = scoreTypeController;
