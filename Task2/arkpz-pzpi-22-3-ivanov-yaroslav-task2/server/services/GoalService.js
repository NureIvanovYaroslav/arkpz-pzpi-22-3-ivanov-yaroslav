const GoalModel = require("../models/Goal");
const UserModel = require("../models/User");
const ApiError = require("../errors/apiError");

class GoalService {
  async createGoal(data) {
    if (
      !data.content ||
      typeof data.content !== "string" ||
      data.content.trim() === ""
    ) {
      throw ApiError.BadRequest("Content must be a non-empty string");
    }

    if (!data.startDate || isNaN(Date.parse(data.startDate))) {
      throw ApiError.BadRequest("Start date must be a valid date");
    }

    if (!data.finishDate || isNaN(Date.parse(data.finishDate))) {
      throw ApiError.BadRequest("Finish date must be a valid date");
    }

    const user = await UserModel.findById(data.user);

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const goal = await GoalModel.create(data);

    user.goals.push(goal._id);

    await user.save();

    return goal;
  }

  async getGoalById(id) {
    const goal = await GoalModel.findById(id);

    if (!goal) {
      throw ApiError.NotFound("Goal not found");
    }

    return goal;
  }

  async updateGoalById(id, updatedFields) {
    if (
      !updatedFields.content ||
      typeof updatedFields.content !== "string" ||
      updatedFields.content.trim() === ""
    ) {
      throw ApiError.BadRequest("Content must be a non-empty string");
    }

    if (
      !updatedFields.startDate ||
      isNaN(Date.parse(updatedFields.startDate))
    ) {
      throw ApiError.BadRequest("Start date must be a valid date");
    }

    if (
      !updatedFields.finishDate ||
      isNaN(Date.parse(updatedFields.finishDate))
    ) {
      throw ApiError.BadRequest("Finish date must be a valid date");
    }

    const goal = await GoalModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!goal) {
      throw ApiError.NotFound("Goal not found");
    }

    return goal;
  }

  async deleteGoalById(id) {
    const goal = await GoalModel.findByIdAndDelete(id);

    if (!goal) {
      throw ApiError.NotFound("Goal not found");
    }

    const user = await UserModel.findById(goal.user);

    if (user) {
      user.goals.pull(goal._id);

      await user.save();
    }

    return goal;
  }

  async getAllGoals() {
    const goals = await GoalModel.find();

    if (goals.length === 0) {
      throw ApiError.NotFound("Goals not found");
    }

    return goals;
  }

  async getGoalsByUserId(userId) {
    const user = await UserModel.findById(userId).populate("goals");

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    const goals = user.goals;

    if (goals.length === 0) {
      throw ApiError.NotFound("Goals not found");
    }

    return goals;
  }
}

module.exports = new GoalService();
