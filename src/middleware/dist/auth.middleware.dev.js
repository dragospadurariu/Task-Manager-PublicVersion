"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user.model');

var auth = function auth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.header('Authorization').replace('Bearer ', ''));

        case 3:
          token = _context.sent;
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded._id,
            'tokens.token': token
          }));

        case 7:
          user = _context.sent;

          if (user) {
            _context.next = 10;
            break;
          }

          throw new Error();

        case 10:
          req.token = token;
          req.user = user;
          next();
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          res.status(401).send({
            error: 'Please authenticate.'
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = auth;