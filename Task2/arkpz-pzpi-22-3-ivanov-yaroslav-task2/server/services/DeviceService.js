const DeviceModel = require("../models/Device");
const TrainingModel = require("../models/Training");
const UserModel = require("../models/User");
const ApiError = require("../errors/apiError");

class DeviceService {
  async createDevice(data) {
    if (
      !data.status ||
      typeof data.status !== "string" ||
      data.status.trim() === ""
    ) {
      throw ApiError.BadRequest("Status must be a non-empty string");
    }

    if (
      !data.sendDataFrequency ||
      typeof data.sendDataFrequency !== "number" ||
      data.sendDataFrequency <= 0
    ) {
      throw ApiError.BadRequest(
        "Send data frequency must be a number greater than zero"
      );
    }

    const user = await UserModel.findById(data.user);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    if (user.device) {
      throw ApiError.BadRequest("User already has a device");
    }

    const device = await DeviceModel.create(data);

    user.device = device._id;

    await user.save();

    return device;
  }

  async getDeviceById(id) {
    const device = await DeviceModel.findById(id);

    if (!device) {
      throw ApiError.NotFound("Device not found");
    }

    return device;
  }

  async updateDeviceById(id, updatedFields) {
    if (
      updatedFields.status &&
      (typeof updatedFields.status !== "string" ||
        updatedFields.status.trim() === "")
    ) {
      throw ApiError.BadRequest("Status must be a non-empty string");
    }

    if (
      updatedFields.sendDataFrequency &&
      (typeof updatedFields.sendDataFrequency !== "number" ||
        updatedFields.sendDataFrequency <= 0)
    ) {
      throw ApiError.BadRequest(
        "Send data frequency must be a number greater than zero"
      );
    }

    const device = await DeviceModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!device) {
      throw ApiError.NotFound("Device not found");
    }

    return device;
  }

  async deleteDeviceById(id) {
    const device = await DeviceModel.findByIdAndDelete(id);

    if (!device) {
      throw ApiError.NotFound("Device not found");
    }

    const user = await UserModel.findById(device.user);

    if (user) {
      user.device = null;
      await user.save();
    }

    await TrainingModel.deleteMany({ device: device._id });

    return device;
  }

  async getAllDevices() {
    const devices = await DeviceModel.find();

    if (devices.length === 0) {
      throw ApiError.NotFound("No devices found");
    }

    return devices;
  }
}

module.exports = new DeviceService();
