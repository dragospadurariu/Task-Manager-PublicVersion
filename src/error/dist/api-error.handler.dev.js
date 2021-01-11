"use strict";

var ApiError = require('./ApiError');

function apiErrorHandler(error, req, res, next) {
  console.log(error);

  if (error instanceof ApiError) {
    var message = error.message,
        errorKey = error.errorKey;
    return res.status(error.code).json({
      message: message,
      errorKey: errorKey
    });
  }

  return res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;