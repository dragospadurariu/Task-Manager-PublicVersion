"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = new express.Router();

var auth = require('../middleware/auth.middleware');

var Label = require('../models/label.model');

var ApiError = require('../error/ApiError');

var Dashboard = require('../models/dashboard.model'); //@route   Get /label
//@desc    Get all dashboards's labels
//@access  Private


router.get('/label/:dashboardId', auth, function _callee(req, res, next) {
  var dashboardId, labels;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dashboardId = req.params.dashboardId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Label.find({
            owner: dashboardId
          }));

        case 4:
          labels = _context.sent;
          res.status(200).send(labels);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          next(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //@route   Post /label
//@desc    Create a new label
//@access  Private

router.post('/label/:dashboardId', auth, function _callee2(req, res, next) {
  var dashboardId, label;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dashboardId = req.params.dashboardId;
          _context2.prev = 1;
          label = new Label(_objectSpread({}, req.body, {
            owner: dashboardId
          }));
          _context2.next = 5;
          return regeneratorRuntime.awrap(label.save());

        case 5:
          res.status(200).send(label);
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
}); //@route   patch /label:id
//@desc    Edit label
//@access  Private

router.patch('/label/:id', auth, function _callee3(req, res, next) {
  var labelId, user, updates, allowedUpdates, isValidOperation, label, dashboardId, dashboard;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          labelId = req.params.id;
          user = req.user;
          updates = Object.keys(req.body);
          allowedUpdates = ['name'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next(ApiError.badRequest('Invalid updates!')));

        case 7:
          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(Label.findOne({
            _id: labelId
          }));

        case 10:
          label = _context3.sent;

          if (label) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", next(ApiError.badRequest('The task does not exist')));

        case 13:
          dashboardId = label.owner;
          _context3.next = 16;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: dashboardId,
            users: user
          }));

        case 16:
          dashboard = _context3.sent;

          if (dashboard) {
            _context3.next = 19;
            break;
          }

          return _context3.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 19:
          updates.forEach(function (update) {
            return label[update] = req.body[update];
          });
          _context3.next = 22;
          return regeneratorRuntime.awrap(label.save());

        case 22:
          res.status(200).send(label);
          _context3.next = 28;
          break;

        case 25:
          _context3.prev = 25;
          _context3.t0 = _context3["catch"](7);
          next(_context3.t0);

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 25]]);
}); //@route   Delete /label/:id
//@desc    Delete a label
//@access  Private

router["delete"]('/label/:id', auth, function _callee4(req, res, next) {
  var labelId, user, label, dashboardId, dashboard;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          labelId = req.params.id;
          user = req.user;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Label.findOne({
            _id: labelId
          }));

        case 5:
          label = _context4.sent;

          if (label) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('The task does not exist')));

        case 8:
          dashboardId = label.owner;
          _context4.next = 11;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: dashboardId,
            users: user
          }));

        case 11:
          dashboard = _context4.sent;

          if (dashboard) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", next(ApiError.badRequest('The dashboard does not exist')));

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(label["delete"]());

        case 16:
          res.status(200).send(label);
          _context4.next = 22;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](2);
          next(_context4.t0);

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 19]]);
});
module.exports = router;