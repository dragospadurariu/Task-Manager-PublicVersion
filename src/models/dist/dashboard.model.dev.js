"use strict";

var mongoose = require('mongoose');

var Column = require('./column.model');

var dashboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  columns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column'
  }],
  users: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String
    },
    email: {
      type: String
    }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  }
}, {
  timestamps: true
});
dashboardSchema.pre('remove', function _callee(next) {
  var dashboard;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dashboard = this;
          _context.next = 3;
          return regeneratorRuntime.awrap(Column.deleteMany({
            dashboard: dashboard._id
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
var Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;