const ScoreType = require("../models/ScoreType");

const scoreTypeController = {
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
