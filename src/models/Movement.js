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
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    personalRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.personalRecord,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.movement, movementSchema);
