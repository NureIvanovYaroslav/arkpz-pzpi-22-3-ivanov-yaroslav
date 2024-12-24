const { Schema, model } = require("mongoose");

const TrainingData = new Schema({
  sendingTime: { type: Date, required: true },
  burnedCalories: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  steps: { type: Number, required: true },
  training: { type: Schema.Types.ObjectId, ref: "Training", required: true },
});

module.exports = model("TrainingData", TrainingData);
