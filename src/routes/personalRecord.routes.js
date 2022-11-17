const express = require("express");
const router = express.Router();
const controller = require("../controllers/personalRecord.controller");

// PUBLIC ROUTES
router.get("/user/:id", controller.getAllByUserId);
router.get("/user/:iduser/movement/:idmov", controller.getHistoryByMovement);
router.get("/:id", controller.getOneById);
router.post("/register", controller.postOne);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);

// ADMIN ROUTES

module.exports = router;
