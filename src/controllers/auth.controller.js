const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const validation = require("../utils/validation");
const bcrypt = require("bcrypt");
const authToken = require("../utils/auth");

const authController = {
  // LOGIN
  login: async (req, res) => {
    const { error } = validation.schemaLogin.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Datos de acceso incorrectos" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Datos de acceso incorrectos" });

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
    };

    const token = authToken.createTokenLogin(userData);
    const refreshToken = authToken.createRefreshToken(userData);

    const newRefreshToken = new RefreshToken({
      token: refreshToken,
      user: user.id,
      expiryDate: Date.now(),
    });

    try {
      await newRefreshToken.save();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(200)
      .header("auth-token", token)
      .json({
        messsage: `Welcome ${user.firstName}`,
        user,
        token,
        refreshToken,
      });
  },
  //CREATE TOKEN
  createToken: async (req, res) => {
    let userData;
    if (req.body.refreshToken) {
      userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id,
      };
    }

    try {
      authToken.verifyToken(req.body.refreshToken, "refreshToken");
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = authToken.createTokenLogin(userData);
    const refreshToken = authToken.createRefreshToken(userData);

    const newRefreshToken = new RefreshToken({
      token: refreshToken,
      user: req.body.id,
      expiryDate: Date.now(),
    });

    try {
      await newRefreshToken.save();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).header("auth-token", token).json({
      token,
      refreshToken,
    });
  },
};

module.exports = authController;
