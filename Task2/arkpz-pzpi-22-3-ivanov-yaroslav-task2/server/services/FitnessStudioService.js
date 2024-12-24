const FitnessStudioModel = require("../models/FitnessStudio");
const TrainingModel = require("../models/Training");
const UserFitnessStudioModel = require("../models/UserFitnessStudio");
const ApiError = require("../errors/apiError");

class FitnessStudioService {
  async createFitnessStudio(data) {
    if (
      !data.studioName ||
      typeof data.studioName !== "string" ||
      data.studioName.trim() === ""
    ) {
      throw ApiError.BadRequest("Studio name must be a non-empty string");
    }

    if (
      !data.address ||
      typeof data.address !== "string" ||
      data.address.trim() === ""
    ) {
      throw ApiError.BadRequest("Address must be a non-empty string");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email || !emailRegex.test(data.email)) {
      throw ApiError.BadRequest("Invalid email format");
    }

    const fitnessStudio = await FitnessStudioModel.create(data);

    return fitnessStudio;
  }

  async addUserToFitnessStudio(userId, fitnessStudioId) {
    const existingUserFitnessStudio = await UserFitnessStudioModel.findOne({
      user: userId,
      fitnessStudio: fitnessStudioId,
    });

    if (existingUserFitnessStudio) {
      throw ApiError.BadRequest(
        "User is already associated with this fitness studio"
      );
    }

    const userFitnessStudio = await UserFitnessStudioModel.create({
      user: userId,
      fitnessStudio: fitnessStudioId,
    });

    return userFitnessStudio;
  }

  async removeUserFromFitnessStudio(userId, fitnessStudioId) {
    const userFitnessStudio = await UserFitnessStudioModel.findOneAndDelete({
      user: userId,
      fitnessStudio: fitnessStudioId,
    });

    if (!userFitnessStudio) {
      throw ApiError.NotFound("User not found in the fitness studio");
    }

    return userFitnessStudio;
  }

  async getAllUniqueUserFitnessStudioCombinations() {
    const userFitnessStudios = await UserFitnessStudioModel.find().populate(
      "user fitnessStudio"
    );

    if (userFitnessStudios.length === 0) {
      throw ApiError.NotFound("No user-fitness studio combinations found");
    }

    return userFitnessStudios;
  }

  async getFitnessStudioById(id) {
    const fitnessStudio = await FitnessStudioModel.findById(id);

    if (!fitnessStudio) {
      throw ApiError.NotFound("Fitness studio not found");
    }

    return fitnessStudio;
  }

  async updateFitnessStudioById(id, updatedFields) {
    if (
      !updatedFields.studioName ||
      typeof updatedFields.studioName !== "string" ||
      updatedFields.studioName.trim() === ""
    ) {
      throw ApiError.BadRequest("Studio name must be a non-empty string");
    }

    if (
      !updatedFields.address ||
      typeof updatedFields.address !== "string" ||
      updatedFields.address.trim() === ""
    ) {
      throw ApiError.BadRequest("Address must be a non-empty string");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!updatedFields.email || !emailRegex.test(updatedFields.email)) {
      throw ApiError.BadRequest("Invalid email format");
    }

    const fitnessStudio = await FitnessStudioModel.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
      }
    );

    if (!fitnessStudio) {
      throw ApiError.NotFound("Fitness studio not found");
    }

    return fitnessStudio;
  }

  async deleteFitnessStudioById(id) {
    const fitnessStudio = await FitnessStudioModel.findByIdAndDelete(id);

    if (!fitnessStudio) {
      throw ApiError.NotFound("Fitness studio not found");
    }

    await UserFitnessStudioModel.deleteMany({ fitnessStudio: id });

    await TrainingModel.deleteMany({ userFitnessStudio: id });

    return fitnessStudio;
  }

  async getAllFitnessStudios() {
    const fitnessStudios = await FitnessStudioModel.find();

    if (fitnessStudios.length === 0) {
      throw ApiError.NotFound("No fitness studios found");
    }

    return fitnessStudios;
  }

  async getUsersByFitnessStudioId(fitnessStudioId) {
    const userFitnessStudios = await UserFitnessStudioModel.find({
      fitnessStudio: fitnessStudioId,
    }).populate("user");

    if (userFitnessStudios.length === 0) {
      throw ApiError.NotFound("No users found for this fitness studio");
    }

    return userFitnessStudios.map((ufs) => ufs.user);
  }
}

module.exports = new FitnessStudioService();
