"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = new express.Router();

var Dashboard = require('../models/dashboard.model.js');

var auth = require('../middleware/auth.middleware');

var ApiError = require('../error/ApiError');

router.get('/dashboards', auth, function _callee(req, res, next) {
  var match;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          match = {};
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(req.user.populate({
            path: 'dashboard',
            match: match,
            options: {
              limit: parseInt(req.query.limit),
              skip: parseInt(req.query.skip),
              sort: {
                createdAt: 1
              }
            }
          }).execPopulate());

        case 4:
          res.send(req.user.dashboard);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
router.get('/dashboards/:id', auth, function _callee2(req, res, next) {
  var id, dashboard;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            owner: req.user._id
          }));

        case 4:
          dashboard = _context2.sent;
          dashboard ? res.send(dashboard) : next(ApiError.forbidden('Dashboard does not exist'));
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.post('/dashboards', auth, function _callee3(req, res, next) {
  var dashboard;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dashboard = new Dashboard(_objectSpread({}, req.body, {
            owner: req.user._id
          }));
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(dashboard.save());

        case 4:
          res.status(201).send(dashboard);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          next(ApiError.internal('Something went wrong'));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
router.patch('/dashboards/:id', auth, function _callee4(req, res, next) {
  var updates, allowedUpdates, isValidOperation, id, dashboard;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ['name'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('Invalid updates!')));

        case 5:
          id = req.params.id;
          _context4.prev = 6;
          _context4.next = 9;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            owner: req.user._id
          }));

        case 9:
          dashboard = _context4.sent;

          if (!dashboard) {
            next(ApiError.forbidden('Dashboard does not exist'));
          }

          updates.forEach(function (update) {
            return dashboard[update] = req.body[update];
          });
          _context4.next = 14;
          return regeneratorRuntime.awrap(dashboard.save());

        case 14:
          res.send(dashboard);
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](6);
          next(ApiError.internal('Something went wrong'));

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[6, 17]]);
});
router["delete"]('/dashboards/:id', auth, function _callee5(req, res, next) {
  var id, dashboard;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            owner: req.user._id
          }));

        case 4:
          dashboard = _context5.sent;

          if (!dashboard) {
            next(ApiError.forbidden('Dashboard does not exist'));
          }

          dashboard.remove();
          res.send(dashboard);
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          next(_context5.t0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
module.exports = router;