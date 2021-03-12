"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = new express.Router();

var auth = require('../middleware/auth.middleware');

var Column = require('../models/column.model');

var Dashboard = require('../models/dashboard.model');

var Task = require('../models/task.model');

var ApiError = require('../error/ApiError'); //@route   POST /task/column/:id
//@desc    Createa a new task
//@access  Private


router.post("/task/column/:id", auth, function _callee(req, res, next) {
  var columnId, user, dashboard, column, task;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          columnId = req.params.id;
          user = req.user;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            users: user,
            columns: columnId
          }));

        case 5:
          dashboard = _context.sent;

          if (dashboard) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", next(ApiError.badRequest('The column does not exist')));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(Column.findOne({
            _id: columnId
          }));

        case 10:
          column = _context.sent;

          if (column) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", next(ApiError.badRequest('The column does not exist')));

        case 13:
          task = new Task(_objectSpread({}, req.body, {
            column: columnId,
            dashboard: dashboard._id,
            owner: user._id
          }));
          task.save();
          column.tasks.push(task._id);
          column.save();
          _context.next = 19;
          return regeneratorRuntime.awrap(task.populate({
            path: 'owner'
          }).execPopulate());

        case 19:
          console.log(task);
          res.status(201).send(task);
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](2);
          next(_context.t0);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 23]]);
}); //Get All Tasks by Column ID

router.get('/task/column/:id', auth, function _callee2(req, res, next) {
  var columnId, user, dashboard, column;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          columnId = req.params.id;
          user = req.user;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            users: user,
            columns: columnId
          }));

        case 5:
          dashboard = _context2.sent;

          if (dashboard) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", next(ApiError.badRequest('The column does not exist')));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Column.findOne({
            _id: columnId
          }));

        case 10:
          column = _context2.sent;

          if (column) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(ApiError.badRequest('The column does not exist')));

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(column.populate('tasks').execPopulate());

        case 15:
          res.status(200).send(column.tasks);
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](2);
          next(_context2.t0);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 18]]);
}); //@route   GET /task/dashboard/:id
//@desc    All Tasks by Dashboard ID
//@access  Private

router.get('/task/dashboard/:id', auth, function _callee3(req, res, next) {
  var dashboardID, user, dashboard, tasks;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dashboardID = req.params.id;
          user = req.user;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            users: user,
            _id: dashboardID
          }));

        case 5:
          dashboard = _context3.sent;

          if (dashboard) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(Task.find({
            dashboard: dashboardID
          }).populate({
            path: 'owner'
          }));

        case 10:
          tasks = _context3.sent;
          res.status(200).send(tasks);
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](2);
          next(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 14]]);
}); //@route   PATCH /task/:id
//@desc    Update description,name or duedate
//@access  Private

router.patch('/task/:id', auth, function _callee4(req, res, next) {
  var taskId, user, updates, allowedUpdates, isValidOperation, task, column, dashboard;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          taskId = req.params.id;
          user = req.user;
          updates = Object.keys(req.body);
          allowedUpdates = ['description', 'name', 'dueDate', 'column', 'label'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('Invalid updates!')));

        case 7:
          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(Task.findOne({
            _id: taskId
          }));

        case 10:
          task = _context4.sent;

          if (task) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('The task does not exist')));

        case 13:
          _context4.next = 15;
          return regeneratorRuntime.awrap(Column.findOne({
            tasks: task
          }));

        case 15:
          column = _context4.sent;

          if (column) {
            _context4.next = 18;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('The column does not exist')));

        case 18:
          _context4.next = 20;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            columns: column,
            users: user
          }));

        case 20:
          dashboard = _context4.sent;

          if (dashboard) {
            _context4.next = 23;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 23:
          updates.forEach(function (update) {
            return task[update] = req.body[update];
          });
          _context4.next = 26;
          return regeneratorRuntime.awrap(task.save());

        case 26:
          _context4.next = 28;
          return regeneratorRuntime.awrap(task.populate({
            path: 'owner'
          }).execPopulate());

        case 28:
          res.status(200).send(task);
          _context4.next = 34;
          break;

        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](7);
          next(_context4.t0);

        case 34:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 31]]);
}); //@route   POST /task/comments/:id
//@desc    Create a comment for the task
//@access  Private

router.post('/task/comments/:id', auth, function _callee5(req, res, next) {
  var taskId, user, task, column, dashboard, newComment;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          taskId = req.params.id;
          user = req.user;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Task.findOne({
            _id: taskId
          }));

        case 5:
          task = _context5.sent;

          if (task) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", next(ApiError.badRequest('The task does not exist')));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(Column.findOne({
            tasks: task
          }));

        case 10:
          column = _context5.sent;

          if (column) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return", next(ApiError.badRequest('The column does not exist')));

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            columns: column,
            users: user
          }));

        case 15:
          dashboard = _context5.sent;

          if (dashboard) {
            _context5.next = 18;
            break;
          }

          return _context5.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 18:
          newComment = {
            owner: task._id,
            text: req.body.text,
            user: {
              userRef: user._id,
              username: user.name
            }
          };
          task.comments.push(newComment);
          _context5.next = 22;
          return regeneratorRuntime.awrap(task.save());

        case 22:
          res.status(200).send(task.comments);
          _context5.next = 28;
          break;

        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](2);
          next(_context5.t0);

        case 28:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 25]]);
}); //@route   Delete /task/comments/:id/:comment_id
//@desc    Delete a comment using taskID and commentID
//@access  Private

router["delete"]('/task/comments/:id/:comment_id', auth, function _callee6(req, res, next) {
  var taskId, commentId, user, task, taskComment, taskCommentslist;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          taskId = req.params.id;
          commentId = req.params.comment_id;
          user = req.user;
          _context6.prev = 3;
          _context6.next = 6;
          return regeneratorRuntime.awrap(Task.findOne({
            _id: taskId,
            owner: user._id
          }));

        case 6:
          task = _context6.sent;

          if (task) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", next(ApiError.badRequest('The task does not exist')));

        case 9:
          taskComment = task.comments.find(function (comment) {
            return comment._id == commentId;
          });

          if (taskComment) {
            _context6.next = 12;
            break;
          }

          return _context6.abrupt("return", next(ApiError.badRequest('The comment does not exist')));

        case 12:
          taskCommentslist = task.comments.filter(function (comment) {
            return comment._id != taskComment._id;
          });
          task.comments = taskCommentslist;
          _context6.next = 16;
          return regeneratorRuntime.awrap(task.save());

        case 16:
          res.status(200).send(task.comments);
          _context6.next = 22;
          break;

        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](3);
          next(_context6.t0);

        case 22:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 19]]);
}); //@route   Delete /task/:id
//@desc    Delete a task
//@access  Private

router["delete"]('/task/:id', auth, function _callee7(req, res, next) {
  var taskId, user, task;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          taskId = req.params.id;
          user = req.user;
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(Task.findOne({
            _id: taskId,
            owner: user._id
          }));

        case 5:
          task = _context7.sent;

          if (task) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", next(ApiError.badRequest('The task does not exist')));

        case 8:
          _context7.next = 10;
          return regeneratorRuntime.awrap(task["delete"]());

        case 10:
          res.status(200).send(task);
          _context7.next = 16;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](2);
          next(_context7.t0);

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
module.exports = router;