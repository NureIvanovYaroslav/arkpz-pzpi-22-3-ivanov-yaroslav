const RoleModel = require("../models/Role");
const UserModel = require("../models/User");
const ApiError = require("../errors/apiError");

class RoleService {
  async createRole(value) {
    if (!value) {
      throw ApiError.BadRequest("Role value cannot be empty");
    }

    const existingRole = await RoleModel.findOne({ value });

    if (existingRole) {
      throw ApiError.BadRequest("Role with this value already exists");
    }

    const role = new RoleModel({ value });

    await role.save();

    return role;
  }

  async getRoleByValue(value) {
    const role = await RoleModel.findOne({ value });

    if (!role) {
      throw ApiError.NotFound("Role not found");
    }

    return role;
  }

  async updateRoleById(id, newValue) {
    if (!newValue) {
      throw ApiError.BadRequest("Role value cannot be empty");
    }

    const role = await RoleModel.findByIdAndUpdate(
      id,
      { value: newValue },
      { new: true }
    );

    if (!role) {
      throw ApiError.NotFound("Role not found");
    }

    return role;
  }

  async deleteRoleById(id) {
    const role = await RoleModel.findByIdAndDelete(id);

    if (!role) {
      throw ApiError.NotFound("Role not found");
    }

    await UserModel.updateMany(
      { roles: role.value },
      { $pull: { roles: role.value } }
    );

    return role;
  }

  async getAllRoles() {
    const roles = await RoleModel.find();

    if (roles.length === 0) {
      throw ApiError.NotFound("No roles found");
    }

    return roles;
  }
}

module.exports = new RoleService();
