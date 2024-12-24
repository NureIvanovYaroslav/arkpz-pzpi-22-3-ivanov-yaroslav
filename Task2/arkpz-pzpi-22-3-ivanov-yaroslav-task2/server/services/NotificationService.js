const NotificationModel = require("../models/Notification");
const UserModel = require("../models/User");
const ApiError = require("../errors/apiError");

class NotificationService {
  async createNotification(data) {
    if (
      !data.type ||
      typeof data.type !== "string" ||
      data.type.trim() === ""
    ) {
      throw ApiError.BadRequest("Notification type must be a non-empty string");
    }

    if (
      !data.content ||
      typeof data.content !== "string" ||
      data.content.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Notification content must be a non-empty string"
      );
    }

    if (!data.notificationDate || isNaN(Date.parse(data.notificationDate))) {
      throw ApiError.BadRequest("Notification date must be a valid date");
    }

    const user = await UserModel.findById(data.user);

    if (!user) {
      throw ApiError.NotFound("User does not exist");
    }

    const notification = await NotificationModel.create(data);

    user.notifications.push(notification._id);

    await user.save();

    return notification;
  }

  async getNotificationById(id) {
    const notification = await NotificationModel.findById(id);

    if (!notification) {
      throw ApiError.NotFound("Notification not found");
    }

    return notification;
  }

  async updateNotificationById(id, updatedFields) {
    if (
      !updatedFields.type ||
      typeof updatedFields.type !== "string" ||
      updatedFields.type.trim() === ""
    ) {
      throw ApiError.BadRequest("Notification type must be a non-empty string");
    }

    if (
      !updatedFields.content ||
      typeof updatedFields.content !== "string" ||
      updatedFields.content.trim() === ""
    ) {
      throw ApiError.BadRequest(
        "Notification content must be a non-empty string"
      );
    }

    if (
      !updatedFields.notificationDate ||
      isNaN(Date.parse(updatedFields.notificationDate))
    ) {
      throw ApiError.BadRequest("Notification date must be a valid date");
    }

    const notification = await NotificationModel.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
      }
    );

    if (!notification) {
      throw ApiError.NotFound("Notification not found");
    }

    return notification;
  }

  async deleteNotificationById(id) {
    const notification = await NotificationModel.findByIdAndDelete(id);

    if (!notification) {
      throw ApiError.NotFound("Notification not found");
    }

    const user = await UserModel.findById(notification.user);

    if (user) {
      user.notifications.pull(notification._id);

      await user.save();
    }

    return notification;
  }

  async getAllNotifications() {
    const notifications = await NotificationModel.find();

    if (notifications.length === 0) {
      throw ApiError.NotFound("Notifications not found");
    }

    return notifications;
  }

  async getNotificationsByUserId(userId) {
    const user = await UserModel.findById(userId).populate("notifications");

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const notifications = user.notifications;

    if (notifications.length === 0) {
      throw ApiError.NotFound("Notifications not found");
    }

    return notifications;
  }
}

module.exports = new NotificationService();
