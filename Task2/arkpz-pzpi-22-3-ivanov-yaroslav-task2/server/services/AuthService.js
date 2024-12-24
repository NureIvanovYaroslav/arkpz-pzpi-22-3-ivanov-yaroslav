const bcrypt = require("bcryptjs");
const RoleModel = require("../models/Role");
const UserModel = require("../models/User");
const tokenService = require("./TokenService");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../errors/apiError");

class AuthService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with this email already exists`);
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const userRole = await RoleModel.findOne({ value: "USER" });

    const user = await UserModel.create({
      email,
      password: hashPassword,
      name: email.split("@")[0],
      birthDate: Date.now(),
      height: null,
      weight: null,
      country: null,
      gender: null,
      device: null,
      roles: [userRole.value],
      notifications: [],
      goals: [],
      userFitnessStudios: [],
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("There are no users with this email");
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw ApiError.BadRequest("Wrong password");
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError("User is not authorised");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError("User is not authorised");
    }

    const user = await UserModel.findById(userData.id);

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return tokens;
  }
}

module.exports = new AuthService();
