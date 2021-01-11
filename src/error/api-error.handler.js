const ApiError = require('./ApiError');

function apiErrorHandler(error, req, res, next) {
  console.log(error);

  if (error instanceof ApiError) {
    const { message, errorKey } = error;

    return res.status(error.code).json({ message: message, errorKey });
  }

  return res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;
