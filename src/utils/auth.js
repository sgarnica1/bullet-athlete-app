const jwt = require("jsonwebtoken");

const createTokenLogin = (data) => {
  return jwt.sign(data, process.env.JWT_LOGIN, { expiresIn: "1800s" });
};

const createTokenRecoverPassword = (data, expiration) => {
  return jwt.sign(data, process.env.JWT_PASSWORD_RECOVER, {
    expiresIn: `${expiration * 1000 * 60}ms`,
  });
};

const verifyToken = (token, type = "login") => {
  return type === "login"
    ? jwt.verify(token, process.env.JWT_LOGIN)
    : jwt.verify(token, process.env.JWT_PASSWORD_RECOVER);
};

module.exports = {
  createTokenLogin,
  createTokenRecoverPassword,
  verifyToken,
};
