const mongoose = require("mongoose");
const models = require("./utils");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.user,
        required: false,
        unique: true,
      },
    ],
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.permission,
        required: false,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.role, roleSchema);
