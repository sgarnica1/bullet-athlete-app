const express = require("express");
const router = express.Router();
const controller = require("../controllers/movement.controller");

// USER ROUTES
router.get("/", controller.getAll);
router.get("/:id", controller.getOneById)

// ADMIN ROUTES
router.post("/register", controller.postOne)


module.exports = router;
