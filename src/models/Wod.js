const mongoose = require("mongoose");
const models = require("./utils");

const wodSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true, 
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    timecap: [
      {
        minutes: {
          type: Number,
          required: true,
        },
        seconds: {
          type: Number,
          required: true,
        },
      },
    ],
    scoreType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.scoreType,
      required: true,
    },
    wodScores: [
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

module.exports = mongoose.model(models.wod, wodSchema);
