const User = require("../models/User");
const Role = require("../models/Role");
const validation = require("../utils/validation");
const bcrypt = require("bcrypt");

const userController = {
  // GET ALL USERS
  getAll: async (_, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET ONE
  getOne: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getUsersBirthdays: async (req, res) => {
    try {
      const users = await User.find();
      const usersBirthdays = [];
      users.forEach((user) => {
        usersBirthdays.push({
          name: `${user.firstName} ${user.lastName}`,
          birthday: user.birthDay,
        });
      });
      console.log(usersBirthdays);
      res.status(200).json(usersBirthdays);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // REGISTER NEW USER -- ADMIN ONLY
  createUser: async (req, res) => {
    // VALIDATE DATA
    const { error } = validation.schemaRegister.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    // CHECK IF EMAIL ALREADY EXISTS
    const emailAlreadyRegistered = await User.findOne({
      email: req.body.email,
    });
    if (emailAlreadyRegistered) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // CREATE NEW USER
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthDay: req.body.birthDay,
      profilePicture: req.body.profilePicture,
      password: password,
    });

    // ADD REQ ROLES TO USER ROLES ARRAY
    req.body.roles.map((role) => {
      user.roles.push(role);
    });

    try {
      // SAVE USER
      const savedUser = await user.save();

      // ASS USER TO ASSIGNED ROLES
      req.body.roles.map(async (role) => {
        const userRole = await Role.findById(role);
        userRole.users.push(savedUser);
        userRole.save();
      });
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },

  // UPDATE PASSWORD -- USER ONLY
  updatePassword: async (req, res) => {
    try {
      const user = await User.findById(req.body.idUser);
      if (!user)
        return res.status(400).json({ error: "Usuario no encontrado" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword)
        return res.status(400).json({ error: "Constraseña incorrecta" });

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.newPassword, salt);

      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: "Contraseña actualizada" });
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },

  // UPDATE BIRTHDAY -- USER ONLY
  updateBirthday: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const updatedUser = await user.update({ birthDay: req.body.birthDay });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  },

  // TOGGLE THEME MODE -- USER ONLY
  toggleTheme: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const updatedUser = await user.update({ darkTheme: req.body.darkTheme });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }
};

module.exports = userController;
