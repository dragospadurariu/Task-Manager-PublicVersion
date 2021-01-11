"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTaskUtils = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var addTaskUtils = function addTaskUtils(columnID, name) {
  var body, res;
  return regeneratorRuntime.async(function addTaskUtils$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = JSON.stringify({
            name: name
          });
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("/task/column/".concat(columnID), body, config));

        case 4:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.addTaskUtils = addTaskUtils;