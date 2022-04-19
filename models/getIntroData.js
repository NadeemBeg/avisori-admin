const mongoose = require("mongoose");

const getIntroDataSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    language: {
      type: String,
      trim: true,
      default:'swedish'
    },
    isDelete:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GetIntroData", getIntroDataSchema);
