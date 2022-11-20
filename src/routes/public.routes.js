const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");


// AUTH ROUTES
router.post("/login", controller.login);
router.post("/token/refresh", controller.createToken);

// INDEX
router.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to Bullet CrossFit API v.1" });
});

module.exports = router;
