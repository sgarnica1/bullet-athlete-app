const mongoose = require("mongoose");
const models = require("./utils");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    movements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.movement,
        required: false,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.category, categorySchema);
