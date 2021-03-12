"use strict";

var express = require('express');

var router = new express.Router();

var User = require('../models/user.model');

var auth = require('../middleware/auth.middleware');

var upload = require('../middleware/upload.middleware');

var jwt = require('jsonwebtoken');

var sendEmail = require('../email/account');

var ApiError = require('../error/ApiError');

router.get('/users/me', auth, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.send({
            user: req.user
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Sign up without email verification

router.post('/users/signup', function _callee2(req, res, next) {
  var email, emailCount, user, token, errors;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.countDocuments({
            email: email
          }));

        case 3:
          emailCount = _context2.sent;

          if (!emailCount) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(ApiError.badRequest(['Email already exists'], 1)));

        case 6:
          user = new User(req.body);
          user.confirmed = true;
          _context2.prev = 8;
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 13:
          token = _context2.sent;
          res.status(201).send({
            user: user,
            token: token
          });
          _context2.next = 24;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](8);

          if (!(_context2.t0.name === 'ValidationError')) {
            _context2.next = 23;
            break;
          }

          errors = [];
          Object.keys(_context2.t0.errors).forEach(function (key) {
            errors.push(_context2.t0.errors[key].message);
          });
          return _context2.abrupt("return", next(ApiError.badRequest(errors, 1)));

        case 23:
          next(_context2.t0);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[8, 17]]);
}); // router.post('/users/signup', async (req, res, next) => {
//   const { email } = req.body;
//   const emailCount = await User.countDocuments({ email });
//   if (emailCount) return next(ApiError.badRequest(['Email already exists'], 1));
//   const user = new User(req.body);
//   try {
//     await user.save();
//     const token = await user.generateAuthToken();
//     sendEmail(token, (error, data) => {
//       if (error) return next(ApiError.internal('Unable to send email', 2));
//     });
//     res.status(201).send({ user, token });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       let errors = [];
//       Object.keys(error.errors).forEach((key) => {
//         errors.push(error.errors[key].message);
//       });
//       return next(ApiError.badRequest(errors, 1));
//     }
//     next(error);
//   }
// });
// router.get('/users/signup/activate/:token', async (req, res, next) => {
//   try {
//     const token = req.params.token;
//     const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id });
//     if (!user) {
//       return next('Something went wrong');
//     }
//     user.confirmed = true;
//     await user.save();
//     res.send({ user, token });
//   } catch (error) {
//     return next('Something went wrong');
//   }
// });

router.post('/users/login', function _callee3(req, res, next) {
  var _req$body, email, password, user, token;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findByCredentials(email, password, next));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return");

        case 7:
          if (!(user.confirmed === false)) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", next(ApiError.forbidden(['You must activate your user before login in'], 1)));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 11:
          token = _context3.sent;
          res.send({
            user: user,
            token: token
          });
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          next(_context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15]]);
});
router.post('/users/logout', auth, function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          req.user.tokens = req.user.tokens.filter(function (token) {
            return token.token !== req.token;
          }); //FIXME:

          _context4.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          res.send();
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/users/logoutAll', auth, function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          req.user.tokens = []; //FIXME:

          _context5.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          res.send();
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/users/me/avatar', auth, upload.single('avatar'), function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          req.user.avatar = req.file.buffer; //FIXME:

          _context6.next = 3;
          return regeneratorRuntime.awrap(req.user.save());

        case 3:
          res.send();

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}, function (error, req, res, next) {
  next(error);
});
router["delete"]('/users/me/avatar', auth, function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          req.user.avatar = undefined; //FIXME:

          _context7.next = 3;
          return regeneratorRuntime.awrap(req.user.save());

        case 3:
          res.send();

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.get('/users/:id/avatar', function _callee8(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context8.sent;

          if (!(!user || !user.avatar)) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return", next(ApiError.forbidden('Invalid User')));

        case 6:
          res.set('Content-Type', 'image/jpg');
          res.send(user.avatar);
          _context8.next = 13;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.patch('/users/me', auth, function _callee9(req, res, next) {
  var updates, allowedUpdates, isValidOperation, user;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ['name', 'email', 'password', 'age'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", next(ApiError.badRequest('Invalid updates!')));

        case 5:
          _context9.prev = 5;
          user = req.user;
          updates.forEach(function (update) {
            return user[update] = req.body[update];
          }); //FIXME:

          _context9.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.send(user);
          _context9.next = 16;
          break;

        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](5);
          next(_context9.t0);

        case 16:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[5, 13]]);
});
router["delete"]('/users/me', auth, function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(req.user.remove());

        case 3:
          res.send(req.user);
          _context10.next = 9;
          break;

        case 6:
          _context10.prev = 6;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;