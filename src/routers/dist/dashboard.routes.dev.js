"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = new express.Router();

var Dashboard = require('../models/dashboard.model.js');

var auth = require('../middleware/auth.middleware');

var ApiError = require('../error/ApiError');

var User = require('../models/user.model.js');

router.get('/dashboards', auth, function _callee(req, res, next) {
  var match, dashboards;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          match = {};
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Dashboard.find({
            users: req.user
          }));

        case 4:
          dashboards = _context.sent;
          // await req.user
          //   .populate({
          //     path: 'dashboard',
          //     match,
          //     options: {
          //       limit: parseInt(req.query.limit),
          //       skip: parseInt(req.query.skip),
          //       sort: {
          //         createdAt: 1,
          //       },
          //     },
          //   })
          //   .execPopulate();
          res.send(dashboards);
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
  var _req$user, _id, name, email, dashboard;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$user = req.user, _id = _req$user._id, name = _req$user.name, email = _req$user.email;
          dashboard = new Dashboard(_objectSpread({}, req.body, {
            owner: req.user._id,
            users: [{
              _id: _id,
              name: name,
              email: email
            }]
          }));
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(dashboard.save());

        case 5:
          res.status(201).send(dashboard);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          next(ApiError.internal('Something went wrong'));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 8]]);
}); //@route   PATCH /dashboard/:id/user/:useremail
//@desc    Add participants to the dashboard
//@access  Private

router.patch('/dashboards/:id/user/:useremail', auth, function _callee4(req, res, next) {
  var _req$params, id, useremail, dashboard, newUser, _id, name, email, userExists;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, useremail = _req$params.useremail;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            owner: req.user._id
          }));

        case 4:
          dashboard = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: useremail
          }));

        case 7:
          newUser = _context4.sent;
          _id = newUser._id, name = newUser.name, email = newUser.email; //Check if user already exists

          _context4.next = 11;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            owner: req.user._id,
            users: newUser
          }));

        case 11:
          userExists = _context4.sent;

          if (userExists) {
            next(ApiError.badRequest('User already exists on this dashboard'));
          }

          if (!dashboard) {
            next(ApiError.forbidden('Y our are not the dashboard owner.'));
          }

          if (!newUser) {
            next(ApiError.forbidden('User does not exists'));
          }

          dashboard.users.push({
            _id: _id,
            name: name,
            email: email
          });
          _context4.next = 18;
          return regeneratorRuntime.awrap(dashboard.save());

        case 18:
          res.send(dashboard);
          _context4.next = 25;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          next(ApiError.internal('Something went wrong'));

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 21]]);
}); //@route   DELETE /dashboard/:id/user/:useremail
//@desc    Delete participant from the dashboard
//@access  Private

router["delete"]('/dashboards/:id/user/:userid', auth, function _callee5(req, res, next) {
  var _req$params2, id, userid, dashboard, deletingUser, _deletingUser, _id, name, email, userExists;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$params2 = req.params, id = _req$params2.id, userid = _req$params2.userid;
          console.log('LOL');
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id
          }));

        case 5:
          dashboard = _context5.sent;

          if (!dashboard) {
            next(ApiError.forbidden('Dashboard does not exist'));
          } //The request is the dashboard owner


          if (!(String(dashboard.owner) === String(req.user._id))) {
            _context5.next = 14;
            break;
          }

          console.log('The dashbord owner is the requester');
          _context5.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            _id: userid
          }));

        case 11:
          deletingUser = _context5.sent;
          _context5.next = 18;
          break;

        case 14:
          console.log('The dashbord owner is NOT the requester');
          _context5.next = 17;
          return regeneratorRuntime.awrap(User.findOne({
            _id: req.user._id
          }));

        case 17:
          deletingUser = _context5.sent;

        case 18:
          _deletingUser = deletingUser, _id = _deletingUser._id, name = _deletingUser.name, email = _deletingUser.email; //Check if user already exists

          if (!deletingUser) {
            next(ApiError.forbidden('User does not exists'));
          }

          if (String(dashboard.owner) === String(deletingUser._id)) {
            next(ApiError.forbidden('You can not leave the dashboard You must delete it'));
          } //Check if user exists in the dashboard


          _context5.next = 23;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            users: deletingUser
          }));

        case 23:
          userExists = _context5.sent;

          if (!userExists) {
            next(ApiError.badRequest('User does not exist on this dashboard'));
          }

          dashboard.users.pull({
            _id: _id,
            name: name,
            email: email
          });
          _context5.next = 28;
          return regeneratorRuntime.awrap(dashboard.save());

        case 28:
          res.send(dashboard);
          _context5.next = 34;
          break;

        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](2);
          next(ApiError.internal('Something went wrong'));

        case 34:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 31]]);
});
router.patch('/dashboards/:id', auth, function _callee6(req, res, next) {
  var updates, allowedUpdates, isValidOperation, id, dashboard;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ['name'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(ApiError.badRequest('Invalid updates!')));

        case 5:
          id = req.params.id;
          _context6.prev = 6;
          _context6.next = 9;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            owner: req.user._id
          }));

        case 9:
          dashboard = _context6.sent;

          if (!dashboard) {
            next(ApiError.forbidden('Dashboard does not exist'));
          }

          updates.forEach(function (update) {
            return dashboard[update] = req.body[update];
          });
          _context6.next = 14;
          return regeneratorRuntime.awrap(dashboard.save());

        case 14:
          res.send(dashboard);
          _context6.next = 20;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](6);
          next(ApiError.internal('Something went wrong'));

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 17]]);
});
router["delete"]('/dashboards/:id', auth, function _callee7(req, res, next) {
  var id, dashboard;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Dashboard.findOne({
            _id: id,
            owner: req.user._id
          }));

        case 4:
          dashboard = _context7.sent;

          if (!dashboard) {
            next(ApiError.forbidden('Dashboard does not exist'));
          }

          dashboard.remove();
          res.send(dashboard);
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);
          next(_context7.t0);

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
module.exports = router;