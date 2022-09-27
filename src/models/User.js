const mongoose = require("mongoose");
const models = require("./utils");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
    },
    birthDay: {
      type: Date,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference an external schema | Foreign Key
        ref: models.role, // Same name as model
        required: true,
      },
    ],
    movements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.movement,
        required: false,
      },
    ],
    personalRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.personalRecord,
        required: false,
        unique: true,
      },
    ],
    personalGoals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.personalGoal,
        required: false,
        unique: true,
      },
    ],
    wodScores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.wodScore,
        required: false,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.user, userSchema);
