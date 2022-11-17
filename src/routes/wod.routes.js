const express = require("express");
const router = express.Router();
const controller = require("../controllers/wod.controller");
const middleware = require("../middleware/auth");

// PUBLIC ROUTES
router.get("/", controller.getAll);
router.get("/:id", controller.getOneById);
router.get("/date/:date", controller.getOneByDate);

// ADMIN ROUTES
router.post("/register", middleware.isAdmin, controller.postOne);
router.put(
  "/update/:id",
  [middleware.isAdmin, controller.middleware.getWodById],
  controller.updateOneById
);
router.delete(
  "/delete/:id",
  [middleware.isAdmin, controller.middleware.getWodById],
  controller.deleteOneById
);

module.exports = router;
