const mongoose = require("mongoose");
const models = require("./utils");

const wodScoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    wod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.wod,
      required: true,
    },
    scoreNum: {
      type: Number,
      required: false,
    },
    scoreTime: [
      {
        minutes: {
          type: Number,
          required: false,
        },
        seconds: {
          type: Number,
          required: false,
        },
      },
    ],
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.wodScore, wodScoreSchema);
