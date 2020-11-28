/**
 * Template file for Model layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */
// import mongoose, { Schema } from 'mongoose';
const mongoose = require("mongoose");

const BasinSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("basin", BasinSchema);
module.exports = model;
