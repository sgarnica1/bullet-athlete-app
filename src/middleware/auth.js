const authUtil = require("../utils/auth");
const User = require("../models/User");
const Role = require("../models/Role");

const authMiddleware = {
  // Validate token is active
  validateTokenActive: (req, res, next) => {
    // const token = req.header("auth-token");
    let token;
    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      return res.status(401).json({ error: "Access denied" });
    }

    try {
      const verified = authUtil.verifyToken(token);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid Token" });
    }
  },

  // ADMIN ROLE
  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findById(req.body.userId); // User
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          return next();
        }
      }
      return res.status(400).json({ error: "Require Admin Role" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authMiddleware;
