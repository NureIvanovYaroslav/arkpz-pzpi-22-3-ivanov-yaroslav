const { Schema, model } = require("mongoose");

const Device = new Schema({
  status: { type: String, required: true },
  sendDataFrequency: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  trainings: [{ type: Schema.Types.ObjectId, ref: "Training", default: [] }],
});

module.exports = model("Device", Device);
