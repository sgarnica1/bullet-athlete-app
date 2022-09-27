const mongoose = require("mongoose");
const models = require("./utils");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.role,
        required: false,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.permission, permissionSchema);
