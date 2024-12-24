const TrainingDataModel = require("../models/TrainingData");
const TrainingModel = require("../models/Training");
const ApiError = require("../errors/apiError");

class TrainingDataService {
  async createTrainingData(data) {
    if (!data.sendingTime || isNaN(Date.parse(data.sendingTime))) {
      throw ApiError.BadRequest("Invalid sending time format");
    }

    if (
      !data.burnedCalories ||
      typeof data.burnedCalories !== "number" ||
      data.burnedCalories <= 0
    ) {
      throw ApiError.BadRequest(
        "Burned calories must be a number greater than 0"
      );
    }

    if (
      !data.heartRate ||
      typeof data.heartRate !== "number" ||
      data.heartRate <= 0
    ) {
      throw ApiError.BadRequest("Heart rate must be a number greater than 0");
    }

    if (!data.steps || typeof data.steps !== "number" || data.steps <= 0) {
      throw ApiError.BadRequest("Steps must be a number greater than 0");
    }

    const training = await TrainingModel.findById(data.training);

    if (!training) {
      throw ApiError.NotFound("Training not found");
    }

    const trainingData = await TrainingDataModel.create(data);

    training.trainingDatas.push(trainingData._id);

    await training.save();

    return trainingData;
  }

  async getTrainingDataById(id) {
    const trainingData = await TrainingDataModel.findById(id);

    if (!trainingData) {
      throw ApiError.NotFound("Training data not found");
    }

    return trainingData;
  }

  async updateTrainingDataById(id, updatedFields) {
    if (
      !updatedFields.sendingTime ||
      isNaN(Date.parse(updatedFields.sendingTime))
    ) {
      throw ApiError.BadRequest("Invalid sending time format");
    }

    if (
      !updatedFields.burnedCalories ||
      typeof updatedFields.burnedCalories !== "number" ||
      updatedFields.burnedCalories <= 0
    ) {
      throw ApiError.BadRequest(
        "Burned calories must be a number greater than 0"
      );
    }

    if (
      !updatedFields.heartRate ||
      typeof updatedFields.heartRate !== "number" ||
      updatedFields.heartRate <= 0
    ) {
      throw ApiError.BadRequest("Heart rate must be a number greater than 0");
    }

    if (
      !updatedFields.steps ||
      typeof updatedFields.steps !== "number" ||
      updatedFields.steps <= 0
    ) {
      throw ApiError.BadRequest("Steps must be a number greater than 0");
    }

    const training = await TrainingModel.findById(updatedFields.training);

    if (!training) {
      throw ApiError.NotFound("Training not found");
    }

    const trainingData = await TrainingDataModel.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
      }
    );

    if (!trainingData) {
      throw ApiError.NotFound("Training data not found");
    }

    return trainingData;
  }

  async deleteTrainingDataById(id) {
    const trainingData = await TrainingDataModel.findByIdAndDelete(id);

    if (!trainingData) {
      throw ApiError.NotFound("Training data not found");
    }

    const training = await TrainingModel.findById(trainingData.training);

    if (training) {
      training.trainingDatas.pull(trainingData._id);
      await training.save();
    }

    return trainingData;
  }

  async getAllTrainingData() {
    const trainingData = await TrainingDataModel.find();

    if (trainingData.length === 0) {
      throw ApiError.NotFound("Training data not found");
    }

    return trainingData;
  }

  async getTrainingDataByTrainingId(trainingId) {
    const training = await TrainingModel.findById(trainingId).populate(
      "trainingDatas"
    );

    if (!training) {
      throw ApiError.NotFound("Training not found");
    }

    const trainingData = training.trainingDatas;

    if (!trainingData || trainingData.length === 0) {
      throw ApiError.NotFound("Training data not found");
    }

    return trainingData;
  }
}

module.exports = new TrainingDataService();
