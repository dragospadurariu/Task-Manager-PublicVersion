"use strict";

var mongoose = require('mongoose');

var Task = require('./task.model');

var columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  dashboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dashboard'
  }
}, {
  timestamps: true
});
columnSchema.pre('remove', function _callee(next) {
  var column;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          column = this;
          _context.next = 3;
          return regeneratorRuntime.awrap(Task.deleteMany({
            column: column._id
          }));

        case 3:
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
var Column = mongoose.model('Column', columnSchema);
module.exports = Column;