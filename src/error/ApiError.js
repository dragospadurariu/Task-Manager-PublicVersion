class ApiError {
  constructor(code, message, errorKey = 0) {
    (this.code = code), (this.message = message), (this.errorKey = errorKey);
  }

  static badRequest(msg, key) {
    return new ApiError(400, msg, key);
  }

  static forbidden(msg, key) {
    return new ApiError(403, msg, key);
  }

  static internal(msg, key) {
    return new ApiError(500, msg, key);
  }
}

module.exports = ApiError;
