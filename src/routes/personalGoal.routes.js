const express = require("express");
const router = express.Router();
const controller = require("../controllers/personalGoal.controller");

// PUBLIC ROUTES
router.get("/user/:id", controller.getAllByUserId);
router.get("/:id", controller.getOneById);
router.post("/register", controller.postOne);
router.put("/achieved/:id", controller.achieved);
router.delete("/delete/:id", controller.delete);

// ADMIN ROUTES

module.exports = router;
