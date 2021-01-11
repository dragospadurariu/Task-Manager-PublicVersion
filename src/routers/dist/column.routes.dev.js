"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = new express.Router();

var auth = require('../middleware/auth.middleware');

var Dashboard = require('../models/dashboard.model');

var Column = require('../models/column.model');

var User = require('../models/user.model');

var ApiError = require('../error/ApiError'); //fetch columns by dashboard id


router.get('/columns/dashboard/:dashboardId', auth, function _callee(req, res, next) {
  var dashboardId, dashboard;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dashboardId = req.params.dashboardId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: dashboardId,
            owner: req.user._id
          }));

        case 4:
          dashboard = _context.sent;

          if (dashboard) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(dashboard.populate('columns').execPopulate());

        case 9:
          res.status(200).send(dashboard.columns);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          next(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
}); //fetch column by column id

router.get('/columns/:columnId', auth, function _callee2(req, res, next) {
  var columnId, user, dashboard, column;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          columnId = req.params.columnId;
          _context2.prev = 1;
          user = req.user;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            owner: user._id,
            columns: columnId
          }));

        case 5:
          dashboard = _context2.sent;

          if (dashboard) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Column.findOne({
            _id: columnId
          }));

        case 10:
          column = _context2.sent;
          res.send(column);
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          next(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router.post('/columns/:dashboardId', auth, function _callee3(req, res, next) {
  var dashboardId, column, dashboard;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dashboardId = req.params.dashboardId;
          _context3.prev = 1;
          column = new Column(_objectSpread({}, req.body, {
            dashboard: dashboardId
          }));
          _context3.next = 5;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: dashboardId,
            owner: req.user._id
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
          return regeneratorRuntime.awrap(column.save());

        case 10:
          dashboard.columns.push(column._id);
          _context3.next = 13;
          return regeneratorRuntime.awrap(dashboard.save());

        case 13:
          res.status(201).send(column);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](1);
          next(_context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
router.patch('/columns/:id', auth, function _callee4(req, res, next) {
  var updates, allowedUpdates, isMatch, id, user, column, dashboard;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ['name'];
          isMatch = updates.every(function (property) {
            return allowedUpdates.includes(property);
          });

          if (isMatch) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('Invalid operation')));

        case 5:
          id = req.params.id;
          user = req.user;
          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(Column.findById(id));

        case 10:
          column = _context4.sent;
          _context4.next = 13;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            owner: user._id,
            columns: id
          }));

        case 13:
          dashboard = _context4.sent;

          if (dashboard) {
            _context4.next = 16;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 16:
          updates.forEach(function (update) {
            return column[update] = req.body[update];
          });
          _context4.next = 19;
          return regeneratorRuntime.awrap(column.save());

        case 19:
          res.status(200).send(column);
          _context4.next = 25;
          break;

        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](7);
          next(_context4.t0);

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 22]]);
});
router["delete"]('/columns/:id', auth, function _callee5(req, res, next) {
  var id, user, column, dashboard;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Column.findById(id));

        case 5:
          column = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            owner: user._id,
            columns: id
          }));

        case 8:
          dashboard = _context5.sent;

          if (dashboard) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap(column.remove());

        case 13:
          res.status(200).send(column);
          _context5.next = 19;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](2);
          next(_context5.t0);

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 16]]);
});
module.exports = router;