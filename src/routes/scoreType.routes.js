const express = require("express");
const router = express.Router();
const controller = require("../controllers/scroreType.controller");
const authMiddleware = require("../middleware/auth");

// PUBLIC ROUTES
router.get("/", controller.getAll);
router.get("/:id", controller.getOneById);

// ADMIN ROUTES
router.post("/register", authMiddleware.isAdmin, controller.postOne);

module.exports = router;
