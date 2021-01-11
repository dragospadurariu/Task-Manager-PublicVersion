"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var Dashboard = require('./dashboard.model');

var chalk = require('chalk');

var ApiError = require('../error/ApiError');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is mandatory'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      return regeneratorRuntime.async(function validate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (validator.isEmail(value)) {
                _context.next = 2;
                break;
              }

              throw new Error('Please enter your email address in format yourname@example.com');

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory'],
    trim: true,
    minLength: [6, 'The password should have at least 6 characters'],
    validate: function validate(value) {
      if (value.includes('password')) {
        throw new Error('Password must be different than password');
      }
    }
  },
  confirmed: {
    type: Boolean,
    "default": false
  },
  age: {
    type: Number,
    "default": 0,
    validate: function validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});
userSchema.virtual('dashboard', {
  ref: 'Dashboard',
  localField: '_id',
  foreignField: 'owner'
}); // userSchema.path('email').validate(async (email) => {
//   const emailCount = await mongoose.models.User.countDocuments({ email });
//   console.log(chalk.yellow(emailCount));
//   return !emailCount;
// }, 'Email already exists');

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

userSchema.methods.generateAuthToken = function _callee() {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user._id.toString()
          }, process.env.JWT_SECRET);
          user.tokens = user.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          return _context2.abrupt("return", token);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

userSchema.statics.findByCredentials = function _callee2(email, password, next) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next(ApiError.badRequest(['Invalid credentials'], 2)));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 7:
          isMatch = _context3.sent;

          if (isMatch) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", next(ApiError.badRequest(['Invalid credentials'], 2)));

        case 10:
          return _context3.abrupt("return", user);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //Hash the plain text password


userSchema.pre('save', function _callee3(next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = this;

          if (!user.isModified('password')) {
            _context4.next = 7;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context4.sent;
          _context4.next = 8;
          break;

        case 7:
          null;

        case 8:
          next();

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
});
userSchema.pre('remove', function _callee4(next) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = this;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Dashboard.deleteMany({
            owner: user._id
          }));

        case 3:
          next();

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model('User', userSchema);
module.exports = User;