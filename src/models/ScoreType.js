const mongoose = require("mongoose");
const models = require("./utils");

const scoreTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    movements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.movement,
        required: false,
      },
    ],
    wods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.wod,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.scoreType, scoreTypeSchema);
