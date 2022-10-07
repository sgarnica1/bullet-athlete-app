const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getOneById);
router.post("/register", controller.postOne);

module.exports = router;
