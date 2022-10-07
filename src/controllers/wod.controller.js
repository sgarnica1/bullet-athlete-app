const Wod = require("../models/Wod");
const validation = require("../utils/validation");

const wodController = {
  // GET ALL
  getAll: async (_, res) => {
    try {
      const wods = await Wod.find().sort({ date: -1 });
      res.status(200).json(wods);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // GET ONE
  getOneById: async (req, res) => {
    try {
      const wod = await Wod.findById(req.params.id);
      res.status(200).json(wod);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getOneByDate: async (req, res) => {
    //DATE FORMAT: YYYY-MM-DD
    const date = req.params.date.split("-");
    const year = date[0];
    let month = date[1];
    const day = date[2];

    try {
      const wods = await Wod.findOne({
        date: { $gte: new Date(year, month - 1, day-1) },
      });
      res.status(200).json(wods);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // POST ONE
  postOne: async (req, res) => {
    const { error } = validation.schemaWod.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const wod = new Wod({
      date: req.body.date,
      description: req.body.description,
      timecap: {
        minutes: req.body.timecap.minutes,
        seconds: req.body.timecap.seconds,
      },
      scoreType: req.body.scoreType,
    });

    try {
      const newWod = await wod.save();
      res.status(201).json(newWod);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // UPDATE ONE
  updateOneById: async (req, res) => {
    // VALIDATE TIMECAP FORMAT
    if (req.body.timecap != null) {
      try {
        if (req.body.timecap.seconds == null)
          throw new Error("Invalid Format: missing seconds");
        if (req.body.timecap.minutes == null)
          throw new Error("Invalid Format: missing minutes");
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
    try {
      const updatedWod = await res.wod.update(req.body);
      res.status(200).json(updatedWod);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },
  // DELETE ONE
  deleteOneById: async (req, res) => {
    try {
      const deletedWod = await res.wod.remove();
      res
        .status(200)
        .json({ message: `Wod successfully deleted with id ${deletedWod.id}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // MIDDLEWARE
  middleware: {
    getWodById: async (req, res, next) => {
      try {
        const wod = await Wod.findById(req.params.id);
        if (wod == undefined) throw new Error("Wod not found or not exists");
        res.wod = wod;
        next();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
  },
};

module.exports = wodController;
