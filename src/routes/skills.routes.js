const express = require("express");
const router = express.Router();
const controller = require("../controllers/skills.controller");

// PUBLIC ROUTES
router.get("/:idUser", controller.getSkillsFromUser);
router.post("/register", controller.addSkillToUser)
router.delete("/delete", controller.deleteSkillFromUser)

module.exports = router;
