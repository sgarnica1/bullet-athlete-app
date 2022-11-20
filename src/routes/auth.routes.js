const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");


// PUBLIC ROUTES
router.post("/login", controller.login);
router.post("/token", controller.createToken);

module.exports = router;