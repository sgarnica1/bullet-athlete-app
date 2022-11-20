if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// CONSTANTS
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const config = require("./src/config/index");
const initRoutes = require("./src/routes/index");

// CORS
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// MIDDLEWARE
app.use(express.json());

// DATABASE
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DATABASE_URL);
db.then(() =>
  app.listen(process.env.PORT || port, () => console.log("Connected"))
);
db.catch((err) => console.log(err));


// REDIRECT TO BASE PATH
app.get("/", (_, res) => {
  res.redirect(config.BASE_PATH);
});

// ROUTES
initRoutes(app);


// 404 ERROR
app.use((_, res) => {
  res.status(404).json({ message: "Resource not found" });
});
