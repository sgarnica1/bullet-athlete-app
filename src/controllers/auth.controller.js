const User = require("../models/User");
const validation = require("../utils/validation");
const bcrypt = require("bcrypt");
const authToken = require("../utils/auth");

// REGISTER NEW USER
const createOne = async (req, res) => {
  const { error } = validation.schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const emailAlreadyRegistered = await User.findOne({ email: req.body.email });
  if (emailAlreadyRegistered) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthDay: req.body.birthDay,
    profilePicture: req.body.profilePicture,
    password: password,
  });
  req.body.roles.map((role) => {
    user.roles.push(role);
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { error } = validation.schemaLogin.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ error: "Wrong Password" });

  const token = authToken.createTokenLogin({
    firstName: user.firstName,
    lastName: user.lastName,
    id: user.id,
  });

  return res
    .status(200)
    .header("auth-token", token)
    .json({ messsage: `Welcome ${user.firstName}`, token });
};

module.exports = {
  createOne,
  login,
};
