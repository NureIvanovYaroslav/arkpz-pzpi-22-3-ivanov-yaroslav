module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(message = "User is not authorized") {
    return new ApiError(401, message);
  }

  static Forbidden(message = "User doesn't have permission") {
    return new ApiError(403, message);
  }

  static NotFound(message = "Resource not found") {
    return new ApiError(404, message);
  }
};
