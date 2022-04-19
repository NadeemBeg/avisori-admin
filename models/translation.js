const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    english: {
      type: String,
      trim: true,
    },
    swedish: {
      type: String,
      trim: true,
    },
    status: {
        type: Number,
        default:1
      },
    isDelete:{
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Translation", translationSchema);