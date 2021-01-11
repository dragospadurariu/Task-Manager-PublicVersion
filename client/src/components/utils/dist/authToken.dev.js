"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAuthToken = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setAuthToken = function setAuthToken(token) {
  if (token) {
    _axios["default"].defaults.headers.common['Authorization'] = "Bearer ".concat(token);
  } else {
    delete _axios["default"].defaults.headers.common['Authorization'];
  }
}; // export default setAuthToken;


exports.setAuthToken = setAuthToken;