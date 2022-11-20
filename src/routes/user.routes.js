const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth");

// PUBLIC ROUTES
router.get("/", controller.getAll);
router.get("/birthdays", controller.getUsersBirthdays);
router.get("/:id", controller.getOne);

// PRIVATE ROUTES
router.post("/:id/darktheme", controller.toggleTheme);
router.put("/password/update", controller.updatePassword);
router.put("/:id/birthday", controller.updateBirthday);

// ADMIN ROUTES
router.post("/register", authMiddleware.isAdmin, controller.createUser);

module.exports = router;
