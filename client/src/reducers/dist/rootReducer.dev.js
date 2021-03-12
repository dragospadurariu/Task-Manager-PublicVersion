"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _alert = _interopRequireDefault(require("./alert.reducer"));

var _auth = _interopRequireDefault(require("./auth.reducer"));

var _columns = _interopRequireDefault(require("./columns.reducer"));

var _data = _interopRequireDefault(require("./data.reducer"));

var _task = _interopRequireDefault(require("./task.reducer"));

var _label = _interopRequireDefault(require("./label.reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  alert: _alert["default"],
  auth: _auth["default"],
  data: _data["default"],
  columns: _columns["default"],
  taskReducer: _task["default"],
  labelReducer: _label["default"]
});
var _default = rootReducer;
exports["default"] = _default;