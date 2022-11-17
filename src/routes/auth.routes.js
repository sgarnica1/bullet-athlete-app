const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

// PUBLIC ROUTES
router.post("/login", controller.login);
router.post("/token", controller.createToken);

// ADMIN ROUTES
router.post("/register", authMiddleware.isAdmin, controller.createUser);

module.exports = router;
