const WodScore = require("../models/WodScore");
const Wod = require("../models/Wod");
const User = require("../models/User");

const wodScoreController = {
  // GET ALL
  getAllByWodId: async (req, res) => {
    try {
      const wodScores = await WodScore.find({ wod: req.params.id });
      res.status(200).json(wodScores);
    } catch (error) {
      res.status(500).json({ message: error.message, name: error.name });
    }
  },
  // GET ONE
  getOneById: async (req, res) => {
    try {
      const wodScore = await WodScore.findById(req.params.id);
      res.status(200).json(wodScore);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  // POST ONE OR UPDATE
  postOne: async (req, res) => {
    const actions = {
      post: "POST",
      put: "PUT",
    };
    let action = actions.post;
    let wodScoreToUpdate;

    // QUERY ALL WODSCORES FROM WOD TO UPDATE IF EXISTS
    const allWodScores = await WodScore.find({ wod: req.body.wod });
    allWodScores.forEach((wodScore) => {
      if (req.body.user == wodScore.user) {
        action = actions.put;
        wodScoreToUpdate = wodScore;
      }
    });

    try {
      const wodScore = new WodScore({
        user: req.body.user,
        wod: req.body.wod,
        scoreNum: req.body.scoreNum,
        scoreTime: {
          minutes: req.body.scoreTime.minutes,
          seconds: req.body.scoreTime.seconds,
        },
      });

      // REVIEW THE ACTION TO PERFORM. CAN NOT HAVE TWO WODSCORES FOR SAME WOD WITH SAME USER
      const newWodScore =
        action == actions.post
          ? await wodScore.save()
          : await wodScoreToUpdate.updateOne({
              active: true,
              scoreNum: req.body.scoreNum,
              scoreTime: {
                minutes: req.body.scoreTime.minutes,
                seconds: req.body.scoreTime.seconds,
              },
            });

      if (action == actions.post) {
        // ADD WODSCORE TO WOD
        const wod = await Wod.findById(req.body.wod);
        wod.wodScores.push(newWodScore);
        await wod.save();

        // ADD WODSCORE TO USER
        const user = await User.findById(req.body.user);
        user.wodScores.push(newWodScore);
        await user.save();
      }

      // RESPONSE
      res.status(201).json(newWodScore);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // DELETE (ACTIVE = FALSE)
  inactive: async (req, res) => {
    try {
      let wodScore = await WodScore.findById(req.params.id);
      wodScore = await wodScore.updateOne({
        active: false,
      });
      res.status(200).json(wodScore);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};

module.exports = wodScoreController;
