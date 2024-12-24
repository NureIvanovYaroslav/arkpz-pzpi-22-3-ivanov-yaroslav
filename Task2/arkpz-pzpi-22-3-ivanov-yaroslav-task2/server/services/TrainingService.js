const DeviceModel = require("../models/Device");
const TrainingModel = require("../models/Training");
const TrainingDataModel = require("../models/TrainingData");
const UserFitnessStudioModel = require("../models/UserFitnessStudio");
const ApiError = require("../errors/apiError");

class TrainingService {
  async createTraining(data) {
    if (
      !data.status ||
      typeof data.status !== "string" ||
      data.status.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Status is required and must be a non-empty string"
      );
    }

    if (!data.startTime || isNaN(Date.parse(data.startTime))) {
      throw ApiError.BadRequest(
        "Start time is required and must be a valid date"
      );
    }

    if (!data.endTime || isNaN(Date.parse(data.endTime))) {
      throw ApiError.BadRequest(
        "End time is required and must be a valid date"
      );
    }

    const training = await TrainingModel.create(data);
    const device = await DeviceModel.findById(data.device);

    if (!device) {
      throw ApiError.NotFound("Device not found");
    }

    device.trainings.push(training._id);

    await device.save();

    const userFitnessStudio = await UserFitnessStudioModel.findById(
      data.userFitnessStudio
    );

    if (!userFitnessStudio) {
      throw ApiError.NotFound("UserFitnessStudio not found");
    }

    userFitnessStudio.trainings.push(training._id);

    await userFitnessStudio.save();

    return training;
  }

  async getTrainingById(id) {
    const training = await TrainingModel.findById(id);

    if (!training) {
      throw ApiError.NotFound("Training not found");
    }

    return training;
  }

  async updateTrainingById(id, updatedFields) {
    if (
      !updatedFields.status ||
      typeof updatedFields.status !== "string" ||
      updatedFields.status.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Status is required and must be a non-empty string"
      );
    }

    if (
      !updatedFields.startTime ||
      isNaN(Date.parse(updatedFields.startTime))
    ) {
      throw ApiError.BadRequest(
        "Start time is required and must be a valid date"
      );
    }

    if (!updatedFields.endTime || isNaN(Date.parse(updatedFields.endTime))) {
      throw ApiError.BadRequest(
        "End time is required and must be a valid date"
      );
    }

    const training = await TrainingModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!training) {
      throw ApiError.NotFound("Training not found");
    }

    return training;
  }

  async deleteTrainingById(id) {
    const training = await TrainingModel.findByIdAndDelete(id);

    if (!training) {
      throw ApiError.NotFound("Training not found");
    }

    const device = await DeviceModel.findById(training.device);

    if (device) {
      device.trainings.pull(training._id);
      await device.save();
    }

    const userFitnessStudio = await UserFitnessStudioModel.findById(
      training.userFitnessStudio
    );

    if (userFitnessStudio) {
      userFitnessStudio.trainings.pull(training._id);
      await userFitnessStudio.save();
    }

    await TrainingDataModel.deleteMany({ training: training._id });

    return training;
  }

  async getAllTrainings() {
    const trainings = await TrainingModel.find();

    if (trainings.length === 0) {
      throw ApiError.NotFound("Trainings not found");
    }

    return trainings;
  }

  async getTrainingsByUserFitnessStudioId(userFitnessStudioId) {
    const trainings = await TrainingModel.find({
      userFitnessStudio: userFitnessStudioId,
    });

    if (trainings.length === 0) {
      throw ApiError.NotFound("Trainings not found");
    }

    return trainings;
  }

  async getTrainingsByDeviceId(deviceId) {
    const trainings = await TrainingModel.find({ device: deviceId });

    if (trainings.length === 0) {
      throw ApiError.NotFound("Trainings not found");
    }

    return trainings;
  }

  async getAllTrainingDataByTrainingId(trainingId) {
    const training = await TrainingModel.findById(trainingId).populate(
      "trainingDatas"
    );

    if (!training) {
      throw ApiError.NotFound("Training not found");
    }

    return training.trainingDatas;
  }
}

module.exports = new TrainingService();
