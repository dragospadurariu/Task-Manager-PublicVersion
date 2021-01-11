"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTaskAction = exports.updateTask = exports.deleteTaskCommentAction = exports.addTaskComment = exports.addNewTask = exports.getTasksByDashboard = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var getTasksByDashboard = function getTasksByDashboard(dashboardID) {
  return function _callee(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/task/dashboard/".concat(dashboardID)));

          case 3:
            res = _context.sent;
            dispatch({
              type: _types.GET_TASKS_BY_DASHBOARD,
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

exports.getTasksByDashboard = getTasksByDashboard;

var addNewTask = function addNewTask(columnID, name) {
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
            return regeneratorRuntime.awrap(_axios["default"].post("/task/column/".concat(columnID), body, config));

          case 4:
            res = _context2.sent;
            console.log('RETURN VALUE: ', res.data);
            dispatch({
              type: _types.ADD_TASK,
              payload: res.data
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };
};

exports.addNewTask = addNewTask;

var addTaskComment = function addTaskComment(taskId, text) {
  return function _callee3(dispatch) {
    var body, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = JSON.stringify({
              text: text
            });
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post("/task/comments/".concat(taskId), body, config));

          case 4:
            res = _context3.sent;
            dispatch({
              type: _types.UPDATE_TASK_COMMENTS,
              payload: {
                id: taskId,
                comments: res.data
              }
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

exports.addTaskComment = addTaskComment;

var deleteTaskCommentAction = function deleteTaskCommentAction(taskId, commentId) {
  return function _callee4(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/task/comments/".concat(taskId, "/").concat(commentId)));

          case 3:
            res = _context4.sent;
            dispatch({
              type: _types.UPDATE_TASK_COMMENTS,
              payload: {
                id: taskId,
                comments: res.data
              }
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

exports.deleteTaskCommentAction = deleteTaskCommentAction;

var updateTask = function updateTask(taskId, updatedTask) {
  return function _callee5(dispatch) {
    var body, res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = JSON.stringify(updatedTask);
            _context5.prev = 1;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].patch("/task/".concat(taskId), body, config));

          case 4:
            res = _context5.sent;
            dispatch({
              type: _types.UPDATE_TASK,
              payload: res.data
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
};

exports.updateTask = updateTask;

var deleteTaskAction = function deleteTaskAction(taskId) {
  return function _callee6(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/task/".concat(taskId), config));

          case 3:
            res = _context6.sent;
            dispatch({
              type: _types.DELETE_TASK,
              payload: res.data
            });
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.deleteTaskAction = deleteTaskAction;