const mongoose = require("mongoose");
const models = require("./utils");

const scoreTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    movements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.movement,
        required: false,
        unique: true,
      },
    ],
    wods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.wod,
        required: false,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.scoreType, scoreTypeSchema);
