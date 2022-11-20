const User = require("../models/User");
const Movement = require("../models/Movement");

const skillsController = {
  // REGISTER SKILL / MOVEMENT
  addSkillToUser: async (req, res) => {
    try {
      // GET USER ID AND MOVEMENT ID
      const skill = await Movement.findById(req.body.idSkill);
      const user = await User.findById(req.body.idUser);

      // ADD SKILL TO USER SKILLS ARRAY AND SAVE
      user.skills.push(skill);
      await user.save();

      // RESPONSE
      res.status(200).json(user.skills);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },

  // GET SKILLS / MOVEMENTS
  getSkillsFromUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.idUser).populate("skills");
      res.status(200).json(user.skills);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },

  // DELETE SKILL / MOVEMENT
  deleteSkillFromUser: async (req, res) => {
    try {
      const user = await User.findById(req.body.idUser);

      // FILTER SKILLS ARRAY AND SAVE
      user.skills = user.skills.filter((s) => {
        return s._id != req.body.idSkill;
      });
      await user.save();

      res.status(200).json(user.skills);

    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }
};

module.exports = skillsController;
