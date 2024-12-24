module.exports = class TrainingDto {
  id;
  status;
  startTime;
  endTime;
  device;
  userFitnessStudio;
  trainingDatas;

  constructor(model) {
    this.id = model._id;
    this.status = model.status;
    this.startTime = model.startTime;
    this.endTime = model.endTime;
    this.device = model.device;
    this.userFitnessStudio = model.userFitnessStudio;
    this.trainingDatas = model.trainingDatas;
  }
};
