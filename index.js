if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// CONSTANTS
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const config = require("./src/config/index");
const initRoutes = require("./src/routes/index");

// MIDDLEWARE
app.use(express.json());

// DATABASE
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DATABASE_URL);
db.then(() =>
  app.listen(process.env.PORT || port, () => console.log("Connected"))
);
db.catch((err) => console.log(err));

// ROUTES
initRoutes(app);

// REDIRECT TO BASE PATH
app.get("/", (_, res) => {
  res.redirect(config.BASE_PATH);
});

const authUtil = require("./src/utils/auth");

const token = authUtil.createTokenLogin({ user: "sgarnica1", id: "1" });
console.log(`token: ${token}`);

// console.log(require('crypto').randomBytes(64).toString('hex'))
