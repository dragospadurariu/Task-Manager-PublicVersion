"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid');
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    validate: function validate(value) {
      if (value.includes('password')) {
        throw new Error('Password must be different than password');
      }
    }
  },
  age: {
    type: Number,
    "default": 0,
    validate: function validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
});

userSchema.statics.findByCredentials = function _callee(email, password) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = User.findOne({
            email: email
          });

          if (user) {
            _context.next = 3;
            break;
          }

          throw new Error('Unable to log in');

        case 3:
          isMatch = bcrypt.compare(password, user.password);

          if (isMatch) {
            _context.next = 6;
            break;
          }

          throw new Error('Unable to log in');

        case 6:
          return _context.abrupt("return", user);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Hash the plain text password


userSchema.pre('save', function _callee2(next) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          console.log('Just before saving');

          if (!user.isModified('password')) {
            _context2.next = 8;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 5:
          user.password = _context2.sent;
          _context2.next = 9;
          break;

        case 8:
          null;

        case 9:
          next();

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model('User', userSchema);
module.exports = User;