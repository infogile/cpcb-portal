const mongoose = require("mongoose");

const FactorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    sector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sector",
      required: true,
      lowercase: true,
      trim: true,
    },
    location: { type: { type: String }, coordinates: [Number] },
    unitcode: { type: String, required: true, unique: true, trim: true },
    state: { type: String, required: true, lowercase: true, trim: true },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
      lowercase: true,
      trim: true,
    },
    region: { type: String, lowercase: true, trim: true },
    basin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "basin",
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("factory", FactorySchema);
