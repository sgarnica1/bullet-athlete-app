const Permission = require("../models/Permission");

// GET ALL PERMISSIONS
const getAll = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
const postOne = async (req, res) => {
  const permission = new Permission({
    name: req.body.name,
    roles: req.body.roles,
  });
  try {
    const savedPermission = await permission.save();
    res.status(201).json(savedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  postOne,
};
