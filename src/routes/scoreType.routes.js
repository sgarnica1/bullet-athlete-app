const express = require("express");
const router = express.Router();
const controller = require("../controllers/scroreType.controller");

router.post("/register", controller.postOne);

module.exports = router;
