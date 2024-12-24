const { Schema, model } = require("mongoose");

const Training = new Schema({
  status: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  device: { type: Schema.Types.ObjectId, ref: "Device", required: true },
  userFitnessStudio: {
    type: Schema.Types.ObjectId,
    ref: "UserFitnessStudio",
    required: true,
  },
  trainingDatas: [
    { type: Schema.Types.ObjectId, ref: "TrainingData", default: [] },
  ],
});

module.exports = model("Training", Training);
