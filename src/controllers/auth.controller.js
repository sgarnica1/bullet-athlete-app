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
    if (!user)
      return res.status(400).json({ error: "Datos de acceso incorrectos" });

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
    
      let userData; let decodedTokenInfo;

      try {
        // VERIFY TOKEN AND GET USER DATA FROM IT
        decodedTokenInfo = authToken.verifyToken(req.body.refreshToken, "refreshToken");
        // CREATE USER DATA OBJECT
        userData = {
          firstName: decodedTokenInfo.firstName,
          lastName: decodedTokenInfo.lastName,
          id: decodedTokenInfo.id,
        };
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

      // CREATE NEW TOKENS
      const token = authToken.createTokenLogin(userData);
      const refreshToken = authToken.createRefreshToken(userData);

      // CREATE NEW REFRESH TOKEN OBJECT
      const newRefreshToken = new RefreshToken({
        token: refreshToken,
        user: decodedTokenInfo.id,
        expiryDate: Date.now(),
      });

      try {
        // SAVE NEW REFRESH TOKEN
        await newRefreshToken.save();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

      // RETURN NEW TOKENS
      return res.status(200).header("auth-token", token).json({
        token,
        refreshToken,
      });
  },
};

module.exports = authController;
