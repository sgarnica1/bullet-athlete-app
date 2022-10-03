const express = require("express");
const router = express.Router();
const controller = require("../controllers/permission.controller");

// GET ALL PERMISSIONS
router.get("/", controller.getAll);
router.post("/register", controller.postOne);

module.exports = router;
