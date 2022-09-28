const Permission = require("../models/Permission");

// GET ALL PERMISSIONS
const index = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE

module.exports = {
  index,
};
