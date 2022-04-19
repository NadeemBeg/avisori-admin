const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    otp: {
      type: Number,
      default:0
    },
    status: {
      type: Number,
      default:1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);