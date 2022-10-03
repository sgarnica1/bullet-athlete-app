const Role = require("../models/Role");

// GET ALL ROLES
const getAll = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
const getOne = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// CREATE
const postOne = async (req, res) => {
  const role = new Role({
    name: req.body.name,
    roles: req.body.roles,
  });
  try {
    const savedRole = await role.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  postOne,
};
