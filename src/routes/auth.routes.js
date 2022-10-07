const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/register", controller.createUser);
router.post("/login", controller.login);
router.post("/token", controller.createToken)

module.exports = router;
