const jwt = require("jsonwebtoken");

const authUtil = {
  createTokenLogin: (data) => {
    return jwt.sign(data, process.env.JWT_LOGIN, { expiresIn: "1800s" });
  },

  createRefreshToken: (data) => {
    return jwt.sign(data, process.env.JWT_REFRESH, { expiresIn: "86400s" });
  },
  createTokenRecoverPassword: (data, expiration) => {
    return jwt.sign(data, process.env.JWT_PASSWORD_RECOVER, {
      expiresIn: `${expiration * 1000 * 60}ms`,
    });
  },

  verifyToken: (token, type = "login") => {
    let typeToken;
    if (type === "login") typeToken = process.env.JWT_LOGIN;
    if (type === "passwordRecover") typeToken = process.env.JWT_PASSWORD_RECOVER;
    if (type === "refreshToken") typeToken = process.env.JWT_REFRESH;

    return jwt.verify(token, typeToken, (error, decoded) => {
      if (error) throw new jwt.TokenExpiredError(error);
    });
  },
};

module.exports = authUtil;
