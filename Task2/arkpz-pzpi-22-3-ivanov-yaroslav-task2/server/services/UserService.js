const DeviceModel = require("../models/Device");
const GoalModel = require("../models/Goal");
const NotificationModel = require("../models/Notification");
const RoleModel = require("../models/Role");
const UserModel = require("../models/User");
const UserFitnessStudioModel = require("../models/UserFitnessStudio");
const ApiError = require("../errors/apiError");

class UserService {
  async getUserById(id) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    return user;
  }

  async editPersonalData(id, updatedFields) {
    if (
      !updatedFields.name ||
      typeof updatedFields.name !== "string" ||
      updatedFields.name.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Name is required and must be a non-empty string"
      );
    }

    if (
      !updatedFields.birthDate ||
      isNaN(Date.parse(updatedFields.birthDate))
    ) {
      throw ApiError.BadRequest(
        "Birth date is required and must be a valid date"
      );
    }

    if (
      !updatedFields.height ||
      typeof updatedFields.height !== "string" ||
      updatedFields.height.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Height is required and must be a non-empty string"
      );
    }

    if (
      !updatedFields.weight ||
      typeof updatedFields.weight !== "string" ||
      updatedFields.weight.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Weight is required and must be a non-empty string"
      );
    }

    if (
      !updatedFields.country ||
      typeof updatedFields.country !== "string" ||
      updatedFields.country.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Country is required and must be a non-empty string"
      );
    }

    if (
      !updatedFields.gender ||
      typeof updatedFields.gender !== "string" ||
      updatedFields.gender.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Gender is required and must be a non-empty string"
      );
    }

    const user = await UserModel.findById(id);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    Object.assign(user, updatedFields);

    await user.save();

    return user;
  }

  async deleteUserById(id) {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    await GoalModel.deleteMany({ user: user._id });

    await NotificationModel.deleteMany({ user: user._id });

    if (user.device) {
      await DeviceModel.findByIdAndDelete(user.device);
    }

    await UserFitnessStudioModel.deleteMany({ user: user._id });

    return user;
  }

  async getAllUsers() {
    const users = await UserModel.find();

    if (users.length === 0) {
      throw ApiError.NotFound("Users not found");
    }

    return users;
  }

  async addUserRole(userId, role) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const userRole = await RoleModel.findOne({ value: role });

    if (!userRole) {
      throw ApiError.NotFound("Role not found");
    }

    const userHasRole = user.roles.includes(role);

    if (!userHasRole) {
      user.roles.push(userRole.value);
    } else {
      throw ApiError.BadRequest("User already has this role");
    }

    user.markModified("roles");

    await user.save();

    return user;
  }

  async deleteUserRole(userId, role) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const userRole = await RoleModel.findOne({ value: role });

    if (!userRole) {
      throw ApiError.NotFound("Role not found");
    }

    const userHasRole = user.roles.includes(role);

    if (!userHasRole) {
      throw ApiError.BadRequest("User does not have this role");
    }

    user.roles = user.roles.filter((roles) => roles !== role);

    await user.save();

    return user;
  }

  async getFitnessStudiosByUserId(userId) {
    const userFitnessStudios = await UserFitnessStudioModel.find({
      user: userId,
    }).populate("fitnessStudio");

    if (userFitnessStudios.length === 0) {
      throw ApiError.NotFound("No fitness studios found for this user");
    }

    return userFitnessStudios.map((ufs) => ufs.fitnessStudio);
  }
}

module.exports = new UserService();
