const express = require("express");
const router = express.Router();
const controller = require("../controllers/wodscore.controller");

// PUBLIC ROUTES
router.get("/wod/:id", controller.getAllByWodId);
router.get("/:id", controller.getOneById);
router.post("/register", controller.postOne);
router.put("/delete/:id", controller.inactive)

// ADMIN ROUTES

module.exports = router;
