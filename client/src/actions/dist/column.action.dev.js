"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteColumn = exports.updateColumn = exports.addColumn = exports.getColumnsByDashboardID = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var getColumnsByDashboardID = function getColumnsByDashboardID(dashboardID) {
  return function _callee(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/columns/dashboard/".concat(dashboardID)));

          case 3:
            res = _context.sent;
            dispatch({
              type: _types.GET_COLUMNS_BY_DASHBOARD,
              payload: res.data
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.getColumnsByDashboardID = getColumnsByDashboardID;

var addColumn = function addColumn(dashboardID, name) {
  return function _callee2(dispatch) {
    var body, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = JSON.stringify({
              name: name
            });
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post("/columns/".concat(dashboardID), body, config));

          case 4:
            res = _context2.sent;
            dispatch({
              type: _types.ADD_NEW_COLUMN,
              payload: res.data
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
};

exports.addColumn = addColumn;

var updateColumn = function updateColumn(name, id) {
  return function _callee3(dispatch) {
    var body, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = JSON.stringify({
              name: name
            });
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].patch("/columns/".concat(id), body, config));

          case 4:
            res = _context3.sent;
            dispatch({
              type: _types.UPDATE_COLUMN,
              payload: res.data
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
};

exports.updateColumn = updateColumn;

var deleteColumn = function deleteColumn(id) {
  return function _callee4(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/columns/".concat(id)));

          case 3:
            res = _context4.sent;
            dispatch({
              type: _types.DELETE_COLUMN,
              payload: res.data
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.deleteColumn = deleteColumn;