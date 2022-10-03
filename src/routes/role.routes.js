const express = require("express");
const router = express.Router();
const controller = require("../controllers/role.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/register", controller.postOne);

module.exports = router;
