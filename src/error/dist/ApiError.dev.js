"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiError =
/*#__PURE__*/
function () {
  function ApiError(code, message) {
    var errorKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, ApiError);

    this.code = code, this.message = message, this.errorKey = errorKey;
  }

  _createClass(ApiError, null, [{
    key: "badRequest",
    value: function badRequest(msg, key) {
      return new ApiError(400, msg, key);
    }
  }, {
    key: "forbidden",
    value: function forbidden(msg, key) {
      return new ApiError(403, msg, key);
    }
  }, {
    key: "internal",
    value: function internal(msg, key) {
      return new ApiError(500, msg, key);
    }
  }]);

  return ApiError;
}();

module.exports = ApiError;