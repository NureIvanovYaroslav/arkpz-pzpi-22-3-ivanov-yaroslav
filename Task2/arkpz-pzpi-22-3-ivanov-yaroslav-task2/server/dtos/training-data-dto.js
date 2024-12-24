module.exports = class TrainingDataDto {
  id;
  sendingTime;
  burnedCalories;
  heartRate;
  steps;
  training;

  constructor(model) {
    this.id = model._id;
    this.sendingTime = model.sendingTime;
    this.burnedCalories = model.burnedCalories;
    this.heartRate = model.heartRate;
    this.steps = model.steps;
    this.training = model.training;
  }
};
