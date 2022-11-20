const PersonalGoal = require("../models/PersonalGoal");
const User = require("../models/User");

const personalGoalController = {
  // GET ALL
  getAllByUserId: async (req, res) => {
    try {
      const personalRecords = await PersonalRecord.find({
        user: req.params.id,
      }).populate("movement");
      res.status(200).json(personalRecords);
    } catch (error) {
      res.status(500).json({ message: error.message, name: error.name });
    }
  },
  // GET ONE
  getOneById: async (req, res) => {
    try {
      const personalRecord = await PersonalRecord.findById(req.params.id)
        .populate("movement")
        .populate("user");
      res.status(200).json(personalRecord);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  // POST ONE
  postOne: async (req, res) => {
    try {
      const pg = new PersonalGoal({
        user: req.body.user,
        movement: req.body.movement,
        scoreNum: req.body.scoreNum,
        scoreTime: {
          minutes: req.body.scoreTime.minutes,
          seconds: req.body.scoreTime.seconds,
        },
      });
      await pg.save();

      // ADD PERSONAL GOAL TO USER
      const user = await User.findById(req.body.user);
      user.personalGoals.push(pg);
      await user.save();

      // RESPONSE
      res.status(201).json(pr);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // MARK AS ACHIEVED
  achieved: async (req, res) => {
    const pgUpdated = {
      achieved: true,
      active: false,
    };

    try {
      let pg = await PersonalGoal.findById(req.params.id);
      const updatedPG = await pg.update(pgUpdated);
      res.status(200).json(updatedPG);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },
  // DELETE (ACTIVE = FALSE)
  delete: async (req, res) => {
    const pgUpdated = {
      active: false,
    };
    try {
      let pg = await PersonalGoal.findById(req.params.id);
      const updatedPG = await pg.update(pgUpdated);
      res.status(200).json(updatedPG);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },
};

module.exports = personalGoalController;
