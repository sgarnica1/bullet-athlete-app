const mongoose = require("mongoose");
const models = require("./utils");

const movementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.category,
      required: true,
    },
    scoretype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.scoreType,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.movement, movementSchema);
