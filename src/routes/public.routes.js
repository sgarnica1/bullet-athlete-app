const express = require("express");
const router = express.Router();

// INDEX
router.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to Bullet CrossFit API v.1" });
});

module.exports = router;
