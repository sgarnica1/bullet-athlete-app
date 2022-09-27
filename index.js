if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// CONSTANTS
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// DATABASE
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DATABASE_URL);
db.then((res) =>
  app.listen(process.env.PORT || port, () => console.log("Connected"))
);
db.catch((err) => console.log(err));

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello");
});
