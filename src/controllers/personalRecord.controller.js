const PersonalRecord = require("../models/PersonalRecord");
const Movement = require("../models/Movement");
const User = require("../models/User");

const personalRecordController = {
  // GET ALL
  getAllByUserId: async (req, res) => {
    try {
      const personalRecords = await PersonalRecord.find({
        user: req.params.id,
      });
      res.status(200).json(personalRecords);
    } catch (error) {
      res.status(500).json({ message: error.message, name: error.name });
    }
  },
  // GET ONE
  getOneById: async (req, res) => {
    try {
      const personalRecord = await PersonalRecord.findById(req.params.id);
      res.status(200).json(personalRecord);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  // GET HISTORY
  getHistoryByMovement: async (req, res) => {
    try {
      const personalRecord = await PersonalRecord.find({
        movement: req.params.idmov,
        user: req.params.iduser,
      });
      res.status(200).json(personalRecord);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  // POST ONE OR UPDATE
  postOne: async (req, res) => {
    try {
      const pr = new PersonalRecord({
        user: req.body.user,
        movement: req.body.movement,
        scoreNum: req.body.scoreNum,
        scoreTime: {
          minutes: req.body.scoreTime.minutes,
          seconds: req.body.scoreTime.seconds,
        },
      });
      await pr.save();

      // ADD PERSONAL RECORD TO MOVEMENT
      const movement = await Movement.findById(req.body.movement);
      movement.personalRecords.push(pr);
      await movement.save();

      // ADD PERSONAL RECORD TO USER
      const user = await User.findById(req.body.user);
      user.personalRecords.push(pr);
      await user.save();

      // RESPONSE
      res.status(201).json(pr);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // UPDATE ONE
  update: async (req, res) => {
    const prUpdate = {
      scoreNum: req.body.scoreNum,
      scoreTime: {
        minutes: req.body.scoreTime.minutes,
        seconds: req.body.scoreTime.seconds,
      },
    };

    try {
      let pr = await PersonalRecord.findById(req.params.id);
      const updatedPR = await pr.update(prUpdate);
      res.status(200).json(updatedPR);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },
  // DELETE (ACTIVE = FALSE)
  delete: async (req, res) => {
    try {
      let pr = await PersonalRecord.findById(req.params.id);
      pr.deleteOne();
      res.status(200).json(pr);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};

module.exports = personalRecordController;
