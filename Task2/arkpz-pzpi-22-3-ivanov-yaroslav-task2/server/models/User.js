const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  birthDate: { type: Date, required: false },
  height: { type: String, required: false },
  weight: { type: String, required: false },
  country: { type: String, required: false },
  gender: { type: String, required: false },
  device: { type: Schema.Types.ObjectId, ref: "Device", required: false },
  roles: [{ type: String, ref: "Role", required: true, default: [] }],
  notifications: [
    { type: Schema.Types.ObjectId, ref: "Notification", default: [] },
  ],
  goals: [{ type: Schema.Types.ObjectId, ref: "Goal", default: [] }],
  userFitnessStudios: [
    { type: Schema.Types.ObjectId, ref: "UserFitnessStudio", default: [] },
  ],
});

module.exports = model("User", User);
