"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePartipant = exports.addPartipants = exports.deleteDashboard = exports.changeDashboardName = exports.getDashboards = exports.addDashboard = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _global = require("../components/utils/global.functions");

var _alert = require("./alert.action");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addDashboard = function addDashboard(name) {
  return function _callee(dispatch) {
    var config, body, res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            body = JSON.stringify({
              name: name
            });
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/dashboards', body, config));

          case 5:
            res = _context.sent;
            dispatch({
              type: _types.ADD_DASHBOARD,
              payload: res.data
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", dispatch((0, _alert.setAlert)('Something went wrong.', 'danger')));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
};

exports.addDashboard = addDashboard;

var getDashboards = function getDashboards() {
  return function _callee2(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get('/dashboards'));

          case 3:
            res = _context2.sent;
            dispatch({
              type: _types.GET_ALL_DASHBOARDS,
              payload: res.data
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.getDashboards = getDashboards;

var changeDashboardName = function changeDashboardName(name, id) {
  return function _callee3(dispatch) {
    var body, config, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = JSON.stringify({
              name: name
            });
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context3.prev = 2;
            _context3.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].patch("/dashboards/".concat(id), body, config));

          case 5:
            res = _context3.sent;
            dispatch({
              type: _types.CHANGE_DASHBOARD_NAME,
              payload: res.data
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
};

exports.changeDashboardName = changeDashboardName;

var deleteDashboard = function deleteDashboard(id) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/dashboards/".concat(id)));

          case 3:
            dispatch({
              type: _types.DELETE_DASHBOARD,
              payload: {
                id: id
              }
            });
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            (0, _global.handleNotification)('Deleting dashboard', 'You must be the dashbord owner in order to delete it', 'danger');

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 6]]);
  };
};

exports.deleteDashboard = deleteDashboard;

var addPartipants = function addPartipants(id, email) {
  return function _callee5(dispatch) {
    var res, message;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].patch("/dashboards/".concat(id, "/user/").concat(email)));

          case 3:
            res = _context5.sent;
            dispatch({
              type: _types.ADD_PARTICIPANTS,
              payload: res.data
            });
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            message = _context5.t0.response.data.message;
            dispatch((0, _alert.setAlert)(message, 'danger'));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.addPartipants = addPartipants;

var deletePartipant = function deletePartipant(dashboardID, userID) {
  return function _callee6(dispatch) {
    var res, message;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/dashboards/".concat(dashboardID, "/user/").concat(userID)));

          case 3:
            res = _context6.sent;
            dispatch({
              type: _types.DELETE_PARTICIPANT,
              payload: res.data
            });
            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            message = _context6.t0.response.data.message;
            dispatch((0, _alert.setAlert)(message, 'danger'));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.deletePartipant = deletePartipant;