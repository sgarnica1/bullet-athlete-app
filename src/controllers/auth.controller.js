const User = require("../models/User");

// REGISTER NEW USER
const createOne = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthDay: req.body.birthDay,
    profilePicture: req.body.profilePicture,
    password: req.body.password,
  });
  user.roles.push(req.body.roles);

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

module.exports = {
  createOne,
};
